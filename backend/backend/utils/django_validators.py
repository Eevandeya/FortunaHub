from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.translation import gettext_lazy as _

from backend.utils.validation import is_valid_phone_number


def validate_phone_number(value: str) -> None:
    if not is_valid_phone_number(value):
        raise DjangoValidationError(
            _("Invalid russian phone number."),
            params={"phone_number": value},
            code="invalid_phone_number",
        )
