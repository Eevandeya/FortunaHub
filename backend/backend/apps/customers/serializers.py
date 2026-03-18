from rest_framework import serializers

from backend.apps.customers.models import Customer, CustomerContact
from backend.validators.drf_validators import validate_phone_number


class CustomerContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerContact
        fields = ["method", "external_id"]


class CustomerSerializer(serializers.ModelSerializer):
    contacts = CustomerContactSerializer(many=True)

    class Meta:
        model = Customer
        fields = ["id", "nickname", "phone_number", "contacts"]
        extra_kwargs = {
            "phone_number": {
                "validators": [],  # excluding the UniqueValidator  TODO: Why is it necessary?
            },
        }
        read_only_fields = ["id"]

    def validate_phone_number(self, value: str) -> str:
        return validate_phone_number(value)
