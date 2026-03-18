from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
    inline_serializer,
)
from rest_framework import serializers, status

from backend.apps.core.serializers import (
    SaunaGallerySerializer,
    SaunaSettingsSerializer,
)

SAUNA_SETTINGS_TAG = "SaunaSettings"
SAUNA_GALLERY_TAG = "SaunaGallery"


SaunaGalleryListSerializer = inline_serializer(
    name="SaunaGalleryList",
    fields={
        "__root__": serializers.ListField(child=SaunaGallerySerializer()),
    },
)


get_sauna_settings_schema = extend_schema(
    summary="Get sauna settings",
    tags=[SAUNA_SETTINGS_TAG],
    description="Retrieve the current sauna settings.",
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=SaunaSettingsSerializer,
            examples=[
                OpenApiExample(
                    name="Settings",
                    value={
                        "opening_time": "08:00",
                        "closing_time": "00:00",
                        "max_visitors_count": 4,
                        "min_time_before_booking": "02:30",
                        "min_booking_time": "02:00",
                        "min_time_between_bookings": "01:00",
                    },
                ),
            ],
        ),
    },
)


get_sauna_gallery_schema = extend_schema(
    summary="Get sauna gallery list",
    tags=[SAUNA_GALLERY_TAG],
    description="Retrieve the the current gallery list.",
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=SaunaGalleryListSerializer,
            description="List of gallery.",
            examples=[
                OpenApiExample(
                    "Gallery",
                    value=[
                        {
                            "display_name": "Фото бани FortunaHub",
                            "slug": "foto-bani-fortunahub",
                            "image": "/media/images/sauna_gallery/IMG_0001.jpeg",
                        },
                        {
                            "display_name": "Фото парилки",
                            "slug": "foto-parilki",
                            "image": "/media/images/sauna_gallery/IMG_0002.jpeg",
                        },
                    ],
                ),
            ],
        ),
    },
)
