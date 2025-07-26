import datetime

from django.core.exceptions import ValidationError
from django.utils.functional import SimpleLazyObject
from django.utils.translation import gettext_lazy as _

from backend.apps.core.models import SaunaConfig

sauna_config = SimpleLazyObject(SaunaConfig.get)

def validate_time_step(value: datetime.datetime) -> None:
    if sauna_config.check_30_min_multiplicity and not (value.minute == 30 or value.minute == 0):
        raise ValidationError(
            _("Time must be a multiple of 30 minutes."),
            params={"time": value},
            code="time_not_multiple_of_30",
        )

def validate_start_time(value: datetime.datetime) -> None:
    if value.time() < sauna_config.opening_time:
        raise ValidationError(
            _("The booking start time cannot be earlier than the booking opening time."),
            params={"start_time": value,
                    "opening_time": sauna_config.opening_time},
            code="booking_start_before_opening",
        )

def validate_end_time(value: datetime.datetime) -> None:
    if (sauna_config.closing_time != datetime.time(0, 0)
            and value.time() > sauna_config.closing_time):
        raise ValidationError(
            _("The end time of the booking cannot be earlier than the closing time of the booking."),
            params={"end_time": value,
                    "closing_time": sauna_config.closing_time},
            code="booking_end_after_closing",
        )

def validate_visitors_count(value: int) -> None:
    if value > sauna_config.max_visitors_count:
        raise ValidationError(
            _("Visitors count should not be greater than max visitors count."),
            params={"visitors_count": value,
                    "max_visitors_count": sauna_config.max_visitors_count},
            code="visitors_exceed_max",
        )
