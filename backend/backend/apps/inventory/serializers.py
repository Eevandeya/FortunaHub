from rest_framework import serializers

from backend.apps.inventory.models import InventoryItem


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = "__all__"
