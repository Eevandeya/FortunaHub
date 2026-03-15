from django.conf import settings
from rest_framework import serializers

from backend.apps.catalog.models import InventoryItem, SaunaPricing


class InventoryItemSerializer(serializers.ModelSerializer):
    currency = serializers.SerializerMethodField()

    class Meta:
        model = InventoryItem
        exclude = ["id", "updated", "is_active"]

    def get_currency(self, _obj: dict) -> str:
        return settings.CASH_CURRENCY_CODE


class SaunaPricingSerializer(serializers.ModelSerializer):
    currency = serializers.SerializerMethodField()

    class Meta:
        model = SaunaPricing
        exclude = ["id", "updated"]

    def get_currency(self, _obj: dict) -> str:
        return settings.CASH_CURRENCY_CODE
