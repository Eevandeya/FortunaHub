import datetime as dt
from collections.abc import Iterator
from dataclasses import dataclass
from decimal import Decimal
from uuid import UUID

from django.conf import settings
from django.utils import timezone
from requests import HTTPError, post

from backend.apps.bookings.models import Booking
from backend.apps.core.models import SaunaSettings


@dataclass(frozen=True)
class TimeSlot:
    start: dt.datetime
    end: dt.datetime

    def duration(self) -> dt.timedelta:
        return self.end - self.start


@dataclass
class FreeSlots:
    date: dt.date
    free_slots: list[TimeSlot]

    def add(self, time_slot: TimeSlot) -> None:
        self.free_slots.append(time_slot)

    def is_empty(self) -> bool:
        return not self.free_slots

    def total_duration(self) -> dt.timedelta:
        return sum((slot.duration() for slot in self.free_slots), start=dt.timedelta())

    def __iter__(self) -> Iterator[TimeSlot]:
        return iter(self.free_slots)


@dataclass
class PaymentRegister:
    order_id: UUID
    form_url: str


class AcquiringError(Exception):
    pass


def get_free_booking_time(booking_date: dt.date) -> FreeSlots:
    """
    Returns a FreeSlots dataclass instance containing available time intervals
    (TimeSlot objects) for creating new reservations.
    Rules:
      1. Each available interval must be separated from existing bookings
         by at least `min_time_between_bookings`.
      2. If the bathhouse closes after midnight, the closing time is treated as the next day's datetime.
    """
    sauna_config = SaunaSettings.get()
    opening, closing = sauna_config.get_opening_and_closing_dt(booking_date)
    next_time = opening

    day_start_datetime = timezone.make_aware(
        dt.datetime.combine(booking_date, dt.time(0))
    )
    day_end_datetime = timezone.make_aware(
        dt.datetime.combine(booking_date + dt.timedelta(days=1), dt.time(0))
    )

    bookings = Booking.objects.filter(
        end_datetime__gt=day_start_datetime, start_datetime__lt=day_end_datetime
    ).order_by("start_datetime")
    free_slots = FreeSlots(booking_date, free_slots=[])

    for booking in bookings:
        start_buf = booking.start_datetime - sauna_config.min_time_between_bookings
        end_buf = booking.end_datetime + sauna_config.min_time_between_bookings

        if start_buf - next_time >= sauna_config.min_booking_time:
            free_slots.add(TimeSlot(start=next_time, end=start_buf))

        next_time = max(next_time, end_buf)

    if closing - next_time >= sauna_config.min_booking_time:
        free_slots.add(TimeSlot(start=next_time, end=closing))

    return free_slots


def create_payment_link(amount: Decimal, order_number: UUID) -> PaymentRegister:
    response = post(
        url=settings.VTB_REGISTER_URL,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "amount": int(amount * 100),  # in kopecks
            "currency": settings.CASH_CURRENCY_CODE,
            "userName": settings.VTB_USERNAME,
            "password": settings.VTB_PASSWORD,
            "returnUrl": settings.BOOKING_ORDER_URL.format(order_number=order_number),
            "orderNumber": order_number,
        },
    )
    try:
        response.raise_for_status()
    except HTTPError as http_err:
        raise AcquiringError("Fail to create payment link.") from http_err

    data = response.json()
    return PaymentRegister(order_id=UUID(data["orderId"]), form_url=data["formUrl"])
