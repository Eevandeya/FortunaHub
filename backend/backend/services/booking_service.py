import datetime as dt
from collections.abc import Iterator
from dataclasses import dataclass

from django.utils import timezone

from backend.apps.bookings.models import Booking
from backend.apps.core.models import SaunaConfig


@dataclass(frozen=True)
class TimeSlot:
    start: dt.datetime
    end: dt.datetime

    def duration(self) -> dt.timedelta:
        return self.end - self.start


@dataclass(frozen=True)
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


def get_free_booking_time(booking_date: dt.date) -> FreeSlots:
    """
    Returns a FreeSlots dataclass instance containing available time intervals
    (TimeSlot objects) for creating new reservations.
    Rules:
      1. Each available interval must be separated from existing bookings
         by at least `min_time_between_bookings`.
      2. If the bathhouse closes after midnight, the closing time is treated as the next day's datetime.
    """
    sauna_config = SaunaConfig.get()
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
