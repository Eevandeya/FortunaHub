from rest_framework import serializers

from backend.apps.inventory.models import BookingItem, InventoryItem


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        exclude = ["id", "updated", "is_active"]


class BookingItemRequestSerializer(serializers.Serializer):
    slug = serializers.SlugField()
    quantity = serializers.IntegerField(min_value=1)

    def validate_slug(self, value: str) -> str:
        if not InventoryItem.objects.filter(slug=value).exists():
            raise serializers.ValidationError("Inventory item does not exist.")
        return value


class BookingItemResponseSerializer(serializers.Serializer):
    slug = serializers.SlugField(source="inventory_item.slug")
    display_name = serializers.CharField(source="inventory_item.display_name")
    quantity = serializers.IntegerField(min_value=1)
    item_type = serializers.ChoiceField(
        choices=InventoryItem.ItemType, source="inventory_item.item_type"
    )
    price = serializers.DecimalField(
        source="inventory_item.unit_price", max_digits=10, decimal_places=2
    )
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, obj: BookingItem) -> str:
        return str(obj.inventory_item.unit_price * obj.quantity)
