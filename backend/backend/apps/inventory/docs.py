from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
    inline_serializer,
)
from rest_framework import serializers, status

from backend.apps.inventory.serializers import InventoryItemSerializer

INVENTORY_TAG = "Inventory"

InventoryItemListSerializer = inline_serializer(
    name="InventoryItemList",
    fields={
        "__root__": serializers.ListField(child=InventoryItemSerializer()),
    },
)

get_inventory_schema = extend_schema(
    summary="Get Inventory Items",
    tags=[INVENTORY_TAG],
    description="Retrieve a list of ALL inventory items.",
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=InventoryItemListSerializer,
            description="List of inventory items.",
            examples=[
                OpenApiExample(
                    "Inventory items",
                    value=[
                        {
                            "id": 2,
                            "display_name": "Халат",
                            "slug": "bathrobe",
                            "description": "Лучший халат для наших гостей! Отлично согревает!",
                            "image": "/media/images/inventory_items/IMG_0001.jpeg",
                            "quantity": 4,
                            "item_type": "rented",
                            "updated": "2025-08-10T01:31:38.062286+03:00",
                            "unit_price": "500.00",
                        },
                        {
                            "id": 1,
                            "display_name": "Веник",
                            "slug": "broom",
                            "description": "Приятный и хороший веник! Замечательный!",
                            "image": "/media/images/inventory_items/IMG_0002.jpeg",
                            "quantity": 10,
                            "item_type": "rented",
                            "updated": "2025-08-16T20:27:49.220468+03:00",
                            "unit_price": "1000.00",
                        },
                    ],
                ),
            ],
        ),
    },
)
