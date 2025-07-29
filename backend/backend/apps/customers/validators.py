import phonenumbers
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.translation import gettext_lazy as _


def validate_phone_number(value: str) -> None:
    exception = DjangoValidationError(
        _("Invalid russian phone number."),
        params={"phone_number": value},
        code="invalid_phone_number",
        )
    try:
        phone = phonenumbers.parse(value, "RU")
        if not phonenumbers.is_valid_number(phone):
            raise exception
    except phonenumbers.NumberParseException:
        raise exception from None
