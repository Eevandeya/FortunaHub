from datetime import datetime

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.bookings.docs import (
    calculate_booking_price_schema,
    create_booking_schema,
    get_free_slots_schema,
)
from backend.apps.bookings.serializers import (
    BookingCreateSerializer,
    BookingPriceRequestSerializer,
    BookingPriceResponseSerializer,
    BookingResponseSerializer,
    FreeSlotsResponseSerializer,
)
from backend.services.booking_service import get_free_booking_time
from backend.services.pricing_service import build_booking_items, get_booking_price


class FreeBookingTimeView(APIView):
    permission_classes = [AllowAny]

    @get_free_slots_schema
    def get(self, request: Request) -> Response:
        date_str = request.query_params.get("date")
        if date_str is None:
            return Response(
                {"error": "No date provided"}, status=status.HTTP_400_BAD_REQUEST
            )
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        except (ValueError, TypeError):
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        free_slots = get_free_booking_time(date_obj)
        serializer = FreeSlotsResponseSerializer(free_slots)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BookingCreateView(APIView):
    # TODO: maybe optimize with prefetching inventory items and customers?
    # TODO: Web client can't access this endpoint
    permission_classes = [AllowAny]

    @create_booking_schema
    def post(self, request: Request) -> Response:
        request_serializer = BookingCreateSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)
        booking = request_serializer.save()
        response_serializer = BookingResponseSerializer(booking)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class BookingPriceView(APIView):
    permission_classes = [AllowAny]

    @calculate_booking_price_schema
    def post(self, request: Request) -> Response:
        input_serializer = BookingPriceRequestSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)

        data = input_serializer.validated_data
        booking_items = build_booking_items(data.get("items", []))

        price = get_booking_price(
            start_datetime=data["start_datetime"],
            end_datetime=data["end_datetime"],
            booking_items=booking_items,
        )

        output_serializer = BookingPriceResponseSerializer(price)
        return Response(output_serializer.data, status=status.HTTP_200_OK)
