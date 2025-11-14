from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
    inline_serializer,
)
from rest_framework import serializers, status

from backend.apps.core.serializers import PricingSerializer, SaunaConfigSerializer

CONFIG_TAG = "Config"
PRICING_TAG = "Pricing"


PricingListSerializer = inline_serializer(
    name="PricingList",
    fields={
        "__root__": serializers.ListField(child=PricingSerializer()),
    },
)


get_sauna_config_schema = extend_schema(
    summary="Get sauna config",
    tags=[CONFIG_TAG],
    description="Retrieve the current sauna configuration settings.",
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=SaunaConfigSerializer,
            examples=[
                OpenApiExample(
                    name="Confing",
                    value={
                        "opening_time": "08:00",
                        "closing_time": "00:00",
                        "max_visitors_count": 4,
                        "min_time_from_now_to_booking": "02:30",
                        "min_booking_time": "02:00",
                        "min_time_between_bookings": "01:00",
                        "check_30_min_multiplicity": True,
                        "created": "2025-08-05T21:11:22.133836+03:00",
                        "prepayment": "2000.00",
                        "hourly_rent": "5000.00",
                        "currency": "RUB",
                    },
                ),
            ],
        ),
    },
)


get_pricing_schema = extend_schema(
    summary="Get pricing list",
    tags=[PRICING_TAG],
    description="Retrieve the the current price list.",
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=PricingListSerializer,
            description="List of pricing.",
            examples=[
                OpenApiExample(
                    "Pricing",
                    value=[
                        {
                            "currency": "RUB",
                            "name": "hourly_rent",
                            "description": "Цена аренды за 1 час",
                            "price": "5000.00",
                        },
                        {
                            "currency": "RUB",
                            "name": "prepayment",
                            "description": "Сумма предоплаты за бронирование",
                            "price": "2000.00",
                        },
                    ],
                ),
            ],
        ),
    },
)
