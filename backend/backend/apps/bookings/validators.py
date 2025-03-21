import datetime

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from .models import SaunaConfig

sauna_config = SaunaConfig.get()

def validate_start_time(start_time: datetime.datetime) -> None:
    # check 30 min multiplicity
    if sauna_config.check_30_min_multiplicity and not (start_time.min == 30 or start_time.min == 0):
        raise ValidationError(
            _("The start time of the booking must be a multiple of 30 minutes."),
            params={'start_time': start_time},
            code="time_not_multiple_of_30",
        )

    if start_time.time() > sauna_config.opening_time:
        raise ValidationError(
            _("The booking start time cannot be earlier than the booking opening time."),
            params={'start_time': start_time,
                    'opening_time': sauna_config.opening_time},
            code="booking_start_before_opening",
        )

def validate_end_time(end_time: datetime.datetime) -> None:
    # check 30 min multiplicity
    if sauna_config.check_30_min_multiplicity and not (end_time.min == 30 or end_time.min == 0):
        raise ValidationError(
            _("The end time of the booking must be a multiple of 30 minutes."),
            params={'end_time': end_time},
            code="time_not_multiple_of_30",
        )

    if (sauna_config.closing_time != datetime.time(0, 0)
            and end_time.time() > sauna_config.closing_time):
        raise ValidationError(
            _("The end time of the booking cannot be earlier than the closing time of the booking."),
            params={'end_time': end_time,
                    'closing_time': sauna_config.closing_time},
            code="booking_end_after_closing",
        )

def validate_bathrobes_count(bathrobes_count: int) -> None:
    if bathrobes_count > sauna_config.max_bathrobes_count:
        raise ValidationError(
            _("Bathrobes count should not be greater than max bathrobes count."),
            params={'bathrobes_count': bathrobes_count,
                    'max_bathrobes_count': sauna_config.max_bathrobes_count},
            code="bathrobes_exceed_max",
        )

def validate_visitors_count(visitors_count: int) -> None:
    if visitors_count > sauna_config.max_visitors_count:
        raise ValidationError(
            _("Visitors count should not be greater than max visitors count."),
            params={'visitors_count': visitors_count,
                    'max_visitors_count': sauna_config.max_visitors_count},
            code="visitors_exceed_max",
        )
