from rest_framework import serializers

from backend.apps.customers.models import Customer
from backend.validators.drf_validators import validate_phone_number


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "nickname", "phone_number"]
        extra_kwargs = {
            "phone_number": {
                "validators": [],  # excluding the UniqueValidator
            },
        }
        read_only_fields = ["id"]

    def validate_phone_number(self, value: str) -> str:
        return validate_phone_number(value)
