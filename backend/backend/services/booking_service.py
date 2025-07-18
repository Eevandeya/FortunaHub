import datetime as dt
from collections.abc import Iterator
from dataclasses import dataclass

from django.utils.timezone import make_aware

from backend.apps.bookings.models import Booking
from backend.apps.core.models import SaunaConfig


@dataclass
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


def _get_opening_and_closing(booking_date: dt.date, sauna_config: SaunaConfig) -> tuple[dt.datetime, dt.datetime]:
    opening = make_aware(dt.datetime.combine(booking_date, sauna_config.opening_time)).astimezone(dt.UTC)
    closing = make_aware(dt.datetime.combine(booking_date, sauna_config.closing_time)).astimezone(dt.UTC)
    if closing <= opening:
        closing += dt.timedelta(days=1)
    return opening, closing


def _get_earliest_start(booking_date: dt.date, opening: dt.datetime, sauna_config: SaunaConfig) -> dt.datetime:
    now = dt.datetime.now(dt.UTC)
    if booking_date == now.date():
        earliest = now + sauna_config.min_time_from_now_to_booking
        return max(opening, earliest)
    return opening


def get_free_booking_time(booking_date: dt.date) -> FreeSlots:
    """
    TODO: BE SURE TO REVIEW
    Returns a list of time intervals (HH: MM), in which it is possible to create a new reservation.
    Rules:
      1. The interval of the new booking should differ from the existing booking at least in min_time_between_bookings.
      2. You can not book earlier than the current time + min_time_from_now_to_booking.
      3. If the bathhouse closes after midnight, we take into account the transition the next day.
    """
    sauna_config = SaunaConfig.get()
    opening, closing = _get_opening_and_closing(booking_date, sauna_config)
    next_time = _get_earliest_start(booking_date, opening, sauna_config)

    bookings = Booking.objects.filter(date=booking_date).order_by("start_datetime")
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
