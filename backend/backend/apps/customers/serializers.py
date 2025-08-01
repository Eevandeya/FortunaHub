import phonenumbers
from rest_framework import serializers

from backend.apps.customers import validators
from backend.apps.customers.models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["nickname", "phone_number"]
        extra_kwargs = {
            "phone_number": {
                "validators": [
                    validators.validate_phone_number
                ],  # excluding the UniqueValidator
            },
        }

    def validate_phone_number(self, value: str) -> str:
        try:
            phone = phonenumbers.parse(value, "RU")
            return phonenumbers.format_number(
                phone, phonenumbers.PhoneNumberFormat.E164
            )
        except phonenumbers.NumberParseException:
            # Though this check already exists in the model validator,
            # we raise a validation error here to be safe
            raise serializers.ValidationError("Invalid russian phone number.") from None
