from drf_spectacular.utils import OpenApiExample, OpenApiResponse, extend_schema
from rest_framework import status

from api_docs.responses import HTTP_403_FORBIDDEN_RESPONSE
from backend.apps.core.serializers import SaunaConfigSerializer

CONFIG_TAG = "Config"

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
                    },
                ),
            ],
        ),
        status.HTTP_403_FORBIDDEN: HTTP_403_FORBIDDEN_RESPONSE,
    },
)
