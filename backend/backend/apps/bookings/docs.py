from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiParameter,
    OpenApiResponse,
    extend_schema,
)
from rest_framework import status

from api_docs.responses import HTTP_403_FORBIDDEN_RESPONSE
from api_docs.schemas import (
    INVALID_QUERY_PARAM_SCHEMA,
    VALIDATION_ERROR_SCHEMA,
)
from backend.apps.bookings.serializers import (
    BookingCreateSerializer,
    BookingPriceRequestSerializer,
    BookingPriceResponseSerializer,
    FreeSlotsResponseSerializer,
)
from backend.apps.inventory.serializers import BookingItemResponseSerializer

BOOKINGS_TAG = "Bookings"

get_free_slots_schema = extend_schema(
    summary="Get available booking slots",
    tags=[BOOKINGS_TAG],
    description=(
        "Returns a list of available booking slots for the specified date.\n\n"
        "Use this endpoint before creating a booking to check availability. "
        "The response contains time ranges in HH:MM format."
    ),
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=FreeSlotsResponseSerializer,
            examples=[
                OpenApiExample(
                    name="Available slots",
                    description=(
                        "Example of available booking slots for a specific date. "
                        "00:00 means midnight of the next day."
                    ),
                    value={
                        "date": "2025-08-18",
                        "free_slots": [
                            {"start": "08:00", "end": "10:00"},
                            {"start": "14:00", "end": "16:00"},
                            {"start": "22:00", "end": "00:00"},
                        ],
                    },
                ),
                OpenApiExample(
                    name="No available slots",
                    value={
                        "date": "2025-08-18",
                        "free_slots": [],
                    },
                ),
            ],
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            response=INVALID_QUERY_PARAM_SCHEMA,
            examples=[
                OpenApiExample(
                    name="Invalid date format",
                    value={"error": "Invalid date format. Use YYYY-MM-DD"},
                ),
            ],
        ),
        status.HTTP_403_FORBIDDEN: HTTP_403_FORBIDDEN_RESPONSE,
    },
    parameters=[
        OpenApiParameter(
            name="date",
            location=OpenApiParameter.QUERY,
            type=OpenApiTypes.DATE,
            description="Date for the booking in YYYY-MM-DD format.",
            required=True,
        )
    ],
)


create_booking_schema = extend_schema(
    summary="Create a booking",
    tags=[BOOKINGS_TAG],
    description=(
        "Creates a booking (no payment).\n\n"
        "The request passes three validation layers: field validation, business rules, and items stock check."
    ),
    request=BookingCreateSerializer,
    responses={
        status.HTTP_201_CREATED: OpenApiResponse(
            response=BookingItemResponseSerializer,
            examples=[
                OpenApiExample(
                    "Booking creation success",
                    description="Returns slightly more information about the booking than was sent to creation.",
                    value={
                        "id": 15,
                        "created": "2025-08-16T21:24:24.690962+03:00",
                        "customer": {
                            "id": 20,
                            "nickname": "Lera",
                            "phone_number": "+79991634567",
                        },
                        "start_datetime": "2025-12-24T11:00:00+03:00",
                        "end_datetime": "2025-12-24T13:00:00+03:00",
                        "visitors_count": 1,
                        "preferred_contact_method": "telegram",
                        "items": [
                            {
                                "slug": "bathrobe",
                                "display_name": "Халат",
                                "quantity": 3,
                                "item_type": "rented",
                                "price": "500.00",
                                "total_price": "1500.00",
                            }
                        ],
                    },
                ),
            ],
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            response=VALIDATION_ERROR_SCHEMA,
            examples=[
                OpenApiExample(
                    "Field level validation",
                    description="Response for field validation errors (layer 1/3).",
                    value={
                        "customer": {"phone_number": ["Invalid russian phone number."]},
                        "items": [{}, {"slug": ["Inventory item does not exist."]}],
                        "end_datetime": ["This field is required."],
                        "preferred_contact_method": [
                            '"instagram" is not a valid choice.'
                        ],
                    },
                ),
                OpenApiExample(
                    "Business level validation",
                    description="Response for business logic validation errors (layer 2/3).",
                    value={
                        "end_datetime": [
                            {
                                "message": "Time must be a multiple of 30 minutes.",
                                "code": "time_not_multiple_of_30",
                                "params": {"time": "2024-10-01 16:03:00+03:00"},
                            }
                        ],
                        "non_field_errors": [
                            {
                                "message": "Booking date cannot be in the past.",
                                "code": "past_booking_time_not_allowed",
                                "params": {
                                    "start_datetime": "2024-10-01 15:00:00+03:00",
                                    "now": "2025-08-16 16:01:26.123776+00:00",
                                },
                            },
                            {
                                "message": "2:00:00 is the minimal booking duration.",
                                "code": "min_booking_duration_not_met",
                                "params": {
                                    "start_datetime": "2024-10-01 15:00:00+03:00",
                                    "end_datetime": "2024-10-01 16:03:00+03:00",
                                    "min_booking_time": "2:00:00",
                                },
                            },
                        ],
                    },
                ),
                OpenApiExample(
                    "Not enough items in stock",
                    description="Response when there are not enough items in stock (layer 3/3).",
                    value={
                        "items": {
                            "bathrobe": ["Not enough stock."],
                            "broom": ["Not enough stock."],
                        }
                    },
                ),
            ],
        ),
        status.HTTP_403_FORBIDDEN: HTTP_403_FORBIDDEN_RESPONSE,
    },
    examples=[
        OpenApiExample(
            "Create booking",
            request_only=True,
            value={
                "customer": {
                    "nickname": "Tyler Durden",
                    "phone_number": "+79991234567",
                },
                "items": [
                    {"slug": "broom", "quantity": 3},
                    {"slug": "bathrobe", "quantity": 2},
                ],
                "start_datetime": "2026-07-25T20:00:00",
                "end_datetime": "2026-07-25T23:00:00",
                "visitors_count": 4,
                "preferred_contact_method": "telegram",
            },
        ),
        OpenApiExample(
            "Create booking without items",
            request_only=True,
            value={
                "customer": {
                    "nickname": "Finn",
                    "phone_number": "89999999999",
                },
                "start_datetime": "2027-07-25T20:00:00",
                "end_datetime": "2027-07-25T23:00:00",
                "visitors_count": 2,
                "preferred_contact_method": "whatsapp",
            },
        ),
    ],
)


calculate_booking_price_schema = extend_schema(
    summary="Calculate booking price",
    tags=[BOOKINGS_TAG],
    description=(
        "Calculates the booking price (no payment).\n\n"
        "The response contains: total price, base price, items price, booking duration, and currency code.\n\n"
        "`total` = `base_price` + `items_price`."
    ),
    request=BookingPriceRequestSerializer,
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            response=BookingPriceResponseSerializer,
            examples=[
                OpenApiExample(
                    name="Booking price calculation success",
                    description="Returns total price, base price, items price, duration, and currency code.",
                    value={
                        "duration": "05:00",
                        "base_price": "25000.00",
                        "items_price": "3000.00",
                        "total": "28000.00",
                        "currency": {"code": "RUB"},
                    },
                ),
            ],
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            description="Validation error",
            response=VALIDATION_ERROR_SCHEMA,
            examples=[
                OpenApiExample(
                    name="Missing required field + wrong datetime format",
                    description="`end_datetime` is missing and `start_datetime` has wrong format.",
                    value={
                        "end_datetime": ["This field is required."],
                        "start_datetime": [
                            "Datetime has wrong format. Use one of these formats instead: "
                            "YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."
                        ],
                    },
                ),
                OpenApiExample(
                    name="End before start",
                    description="`end_datetime` must be greater than `start_datetime`.",
                    value={
                        "end_datetime": [
                            "End datetime must be greater than start datetime."
                        ]
                    },
                ),
                OpenApiExample(
                    name="Unknown inventory item",
                    description="One of the provided `slug` values does not exist.",
                    value={"items": [{"slug": ["Inventory item does not exist."]}, {}]},
                ),
                OpenApiExample(
                    name="Negative quantity",
                    description="Quantity must be a positive integer.",
                    value={
                        "items": [
                            {
                                "quantity": [
                                    "Ensure this value is greater than or equal to 1."
                                ]
                            },
                            {},
                        ]
                    },
                ),
            ],
        ),
        status.HTTP_403_FORBIDDEN: HTTP_403_FORBIDDEN_RESPONSE,
    },
    examples=[
        OpenApiExample(
            name="Minimal request (base price only)",
            description="Booking without items, only base time interval.",
            value={
                "start_datetime": "2025-09-16T10:00:00Z",
                "end_datetime": "2025-09-16T15:00:00Z",
            },
            request_only=True,
        ),
        OpenApiExample(
            name="With items",
            description="Booking with additional items (using `slug` and `quantity`).",
            value={
                "start_datetime": "2025-09-16T10:00:00Z",
                "end_datetime": "2025-09-16T15:00:00Z",
                "items": [
                    {"slug": "broom", "quantity": 2},
                    {"slug": "bathrobe", "quantity": 1},
                ],
            },
            request_only=True,
        ),
    ],
)
