from drf_spectacular.utils import OpenApiExample
from rest_framework import status

INVALID_API_KEY_EXAMPLE = OpenApiExample(
    name="Invalid API key",
    value={"detail": "Invalid API key."},
    description="Returned when the request is missing or has an invalid API key.",
    response_only=True,
    status_codes=[status.HTTP_403_FORBIDDEN],
)
