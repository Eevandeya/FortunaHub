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

def validate_visitors_count(value: int) -> None:
    if value > sauna_config.max_visitors_count:
        raise ValidationError(
            _("Visitors count should not be greater than max visitors count."),
            params={"visitors_count": value,
                    "max_visitors_count": sauna_config.max_visitors_count},
            code="visitors_exceed_max",
        )
