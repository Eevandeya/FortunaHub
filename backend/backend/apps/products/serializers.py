from django.conf import settings
from rest_framework import serializers

from backend.apps.products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    currency = serializers.SerializerMethodField()

    class Meta:
        model = Product
        exclude = ["id", "updated", "is_active"]

    def get_currency(self, _obj: dict) -> str:
        return settings.CASH_CURRENCY_CODE
