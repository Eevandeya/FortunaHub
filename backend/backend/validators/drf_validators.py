# Maybe I'll remove this file in the future

import phonenumbers
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from backend.validators.validation import is_valid_phone_number


def validate_phone_number(value: str) -> str:
    if not is_valid_phone_number(value):
        raise serializers.ValidationError(
            _("Invalid russian phone number."), code="invalid_phone_number"
        ) from None
    return phonenumbers.format_number(
        phonenumbers.parse(value, "RU"), phonenumbers.PhoneNumberFormat.E164
    )
