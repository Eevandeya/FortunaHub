import phonenumbers
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from backend.apps.customers import validators
from backend.apps.customers.models import Customer
from backend.utils.validators import is_valid_phone_number


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "nickname", "phone_number"]
        extra_kwargs = {
            "phone_number": {
                "validators": [
                    validators.validate_phone_number
                ],  # excluding the UniqueValidator
            },
        }
        read_only_fields = ["id"]

    def validate_phone_number(self, value: str) -> str:
        if not is_valid_phone_number(value):
            raise serializers.ValidationError(
                _("Invalid russian phone number."), code="invalid_phone_number"
            ) from None
        return phonenumbers.format_number(
            phonenumbers.parse(value, "RU"), phonenumbers.PhoneNumberFormat.E164
        )
