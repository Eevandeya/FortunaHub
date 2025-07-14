import datetime

from django.utils import timezone

from backend.apps.bookings.models import Booking
from backend.apps.core.models import SaunaConfig


def get_free_booking_time(booking_date: datetime.date) -> list[tuple[str, str]]:
    """
    TODO: BE SURE TO REVIEW
    Returns a list of time intervals (HH: MM), in which it is possible to create a new reservation.

    Rules:
      1. The interval of the new booking should differ from the existing booking at least in min_time_between_bookings.
      2. You can not book earlier than the current time + min_time_from_now_to_booking.
      3. If the bathhouse closes after midnight, we take into account the transition the next day.
    """
    # we load the parameters from the configuration
    sauna_config = SaunaConfig.get()

    # we form absolute points of discovery and closure
    opening_dt = (datetime.datetime.combine(booking_date, sauna_config.opening_time).
                  astimezone(timezone.get_current_timezone()))
    closing_dt = (datetime.datetime.combine(booking_date, sauna_config.closing_time).
                  astimezone(timezone.get_current_timezone()))
    # If closing later than midnight, we transfer the next day
    if closing_dt <= opening_dt:
        closing_dt += datetime.timedelta(days=1)

    # we determine the minimum possible start time
    now = (datetime.datetime.now().astimezone(timezone.get_current_timezone()))
    if booking_date == now.date():
        earliest_start = now + sauna_config.min_time_from_now_to_booking
        # Не раньше открытия
        next_time = max(earliest_start, opening_dt)
    else:
        next_time = opening_dt

    # we collect existing armor on the date, sorting at the beginning
    bookings = Booking.objects.filter(date=booking_date).order_by("start_datetime")
    free_slots: list[tuple[str, str]] = []

    for booking in bookings:
        # we take into account the buffer before and after the existing armor
        start_buf = booking.start_datetime_local - sauna_config.min_time_between_bookings
        end_buf = booking.end_datetime_local + sauna_config.min_time_between_bookings

        # if there is a sufficient interval between Next_Time and the beginning of the armor without a buffer
        if start_buf - next_time >= sauna_config.min_booking_time:
            free_slots.append((next_time.strftime("%H:%M"), start_buf.strftime("%H:%M")))

        # we move next_time by the end of the buffer
        next_time = max(next_time, end_buf)

    # check the interval before closing
    if closing_dt - next_time >= sauna_config.min_booking_time:
        free_slots.append((next_time.strftime("%H:%M"), closing_dt.strftime("%H:%M")))

    return free_slots
