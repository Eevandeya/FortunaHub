from rest_framework import serializers

from backend.apps.inventory.models import InventoryItem


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = "__all__"


class BookingItemSerializer(serializers.Serializer):
    slug = serializers.SlugField()
    quantity = serializers.IntegerField(min_value=1)

    def validate_slug(self, value: str) -> str:
        if not InventoryItem.objects.filter(slug=value).exists():
            raise serializers.ValidationError("Inventory item does not exist.")
        return value
