import datetime

from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.functional import SimpleLazyObject
from django.utils.translation import gettext_lazy as _

from backend.apps.core.models import SaunaSettings

sauna_config = SimpleLazyObject(SaunaSettings.get)


def validate_time_step(value: datetime.datetime) -> None:
    """
    The time step must be a multiple of 30 minutes !
    """
    if value.minute % 30 != 0:
        raise DjangoValidationError(
            _("Time must be a multiple of 30 minutes."),
            params={"time": value},
            code="time_not_multiple_of_30",
        )


def validate_visitors_count(value: int) -> None:
    if value > sauna_config.max_visitors_count:
        raise DjangoValidationError(
            _("Visitors count should not be greater than max visitors count."),
            params={
                "visitors_count": value,
                "max_visitors_count": sauna_config.max_visitors_count,
            },
            code="visitors_exceed_max",
        )
