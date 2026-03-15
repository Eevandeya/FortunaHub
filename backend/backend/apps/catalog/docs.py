from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
    inline_serializer,
)
from rest_framework import serializers, status

from backend.apps.catalog.serializers import (
    InventoryItemSerializer,
    SaunaPricingSerializer,
)

INVENTORY_ITEM_TAG = "InventoryItem"
SAUNA_PRICING_TAG = "SaunaPricing"

InventoryItemsListSerializer = inline_serializer(
    name="InventoryItemsList",
    fields={
        "__root__": serializers.ListField(child=InventoryItemSerializer()),
    },
)

SaunaPricingListSerializer = inline_serializer(
    name="SaunaPricing",
    fields={
        "__root__": serializers.ListField(child=SaunaPricingSerializer()),
    },
)

get_inventory_items_schema = extend_schema(
    summary="Get inventory items list",
    tags=[INVENTORY_ITEM_TAG],
    description="Retrieve a list of all inventory items.",
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=InventoryItemsListSerializer,
            description="List of inventory items.",
            examples=[
                OpenApiExample(
                    "InventoryItems",
                    value=[
                        {
                            "currency": "RUB",
                            "display_name": "Халат",
                            "slug": "bathrobe",
                            "description": "Лучший халат для наших гостей! Отлично согревает!",
                            "image": "/media/images/inventory_items/IMG_0001.jpeg",
                            "quantity": 4,
                            "product_type": "rented",
                            "price": "500.00",
                        },
                        {
                            "currency": "RUB",
                            "display_name": "Веник",
                            "slug": "broom",
                            "description": "Приятный и хороший веник! Замечательный!",
                            "image": "/media/images/inventory_items/IMG_0002.jpeg",
                            "quantity": 10,
                            "product_type": "consumable",
                            "price": "1000.00",
                        },
                    ],
                ),
            ],
        ),
    },
)


get_sauna_pricing_schema = extend_schema(
    summary="Get sauna pricing list",
    tags=[SAUNA_PRICING_TAG],
    description="Retrieve the the current price list for sauna.",
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=SaunaPricingListSerializer,
            description="List of sauna pricing.",
            examples=[
                OpenApiExample(
                    "SaunaPricing",
                    value=[
                        {
                            "currency": "RUB",
                            "display_name": "Почасовая аренда",
                            "slug": "hourly_rent",
                            "description": "Цена аренды за 1 час",
                            "price": "5000.00",
                        },
                        {
                            "currency": "RUB",
                            "display_name": "Предоплата",
                            "slug": "prepayment",
                            "description": "Сумма предоплаты за бронирование",
                            "price": "2000.00",
                        },
                    ],
                ),
            ],
        ),
    },
)
