import datetime

from django.utils import timezone

from backend.apps.bookings.models import Booking
from backend.apps.core.models import SaunaConfig


def get_free_booking_time(booking_date: datetime.date) -> list[tuple[str, str]]:
    sauna_config = SaunaConfig.get()
    bookings = Booking.objects.filter(date=booking_date)

    opening_time = (datetime.datetime.combine(booking_date, sauna_config.opening_time).
                    astimezone(timezone.get_current_timezone()))
    closing_time = (datetime.datetime.combine(booking_date, sauna_config.closing_time).
                    astimezone(timezone.get_current_timezone()))

    if closing_time < opening_time:
        closing_time += datetime.timedelta(days=1)

    if datetime.date.today() == booking_date:
        next_time = (datetime.datetime.now().astimezone(timezone.get_current_timezone()) +
                     sauna_config.min_time_from_now_to_booking)
    else:
        next_time = opening_time

    free_booking_time = []
    for booking in bookings:
        start_datetime = booking.start_datetime_local - sauna_config.min_time_between_bookings
        end_datetime = booking.end_datetime_local + sauna_config.min_time_between_bookings
        if (start_datetime - next_time) >= sauna_config.min_booking_time:
            free_booking_time.append((next_time.strftime("%H:%M"), start_datetime.strftime("%H:%M")))
        next_time = end_datetime

    if (closing_time - next_time) >= sauna_config.min_booking_time:
        free_booking_time.append((next_time.strftime("%H:%M"), closing_time.strftime("%H:%M")))

    return free_booking_time
