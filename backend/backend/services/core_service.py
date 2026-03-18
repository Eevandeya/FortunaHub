import datetime as dt

from django.utils import timezone


def _aware(date: dt.date, t: dt.time) -> dt.datetime:
    return timezone.make_aware(dt.datetime.combine(date, t))


def is_booking_within_open_hours(
    opening_t: dt.time, closing_t: dt.time, start_dt: dt.datetime, end_dt: dt.datetime
) -> bool:
    one_day = dt.timedelta(days=1)
    start_date = start_dt.date()
    opening_date = start_date if start_dt.time() >= opening_t else start_date - one_day
    opening = _aware(opening_date, opening_t)
    closing_date = opening_date if closing_t > opening_t else opening_date + one_day
    closing = _aware(closing_date, closing_t)
    return opening <= start_dt and end_dt <= closing
