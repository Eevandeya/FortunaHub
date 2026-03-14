from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
    inline_serializer,
)
from rest_framework import serializers, status

from backend.apps.products.serializers import ProductSerializer

PRODUCT_TAG = "Product"

ProductsListSerializer = inline_serializer(
    name="ProductsList",
    fields={
        "__root__": serializers.ListField(child=ProductSerializer()),
    },
)

get_products_schema = extend_schema(
    summary="Get Products",
    tags=[PRODUCT_TAG],
    description="Retrieve a list of all products.",
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=ProductsListSerializer,
            description="List of products.",
            examples=[
                OpenApiExample(
                    "Products",
                    value=[
                        {
                            "currency": "RUB",
                            "display_name": "Халат",
                            "slug": "bathrobe",
                            "description": "Лучший халат для наших гостей! Отлично согревает!",
                            "image": "/media/images/products/IMG_0001.jpeg",
                            "quantity": 4,
                            "product_type": "rented",
                            "price": "500.00",
                        },
                        {
                            "currency": "RUB",
                            "display_name": "Веник",
                            "slug": "broom",
                            "description": "Приятный и хороший веник! Замечательный!",
                            "image": "/media/images/products/IMG_0002.jpeg",
                            "quantity": 10,
                            "product_type": "rented",
                            "price": "1000.00",
                        },
                    ],
                ),
            ],
        ),
    },
)
