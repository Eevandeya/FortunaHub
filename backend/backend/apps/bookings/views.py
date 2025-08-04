from datetime import datetime

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.authentication.auth import APIKeyHeaderAuthentication
from backend.apps.bookings.serializers import (
    BookingSerializer,
    FreeSlotsResponseSerializer,
)
from backend.services.booking_service import get_free_booking_time


class FreeBookingTimeView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [APIKeyHeaderAuthentication]

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
        return Response(serializer.data)


class BookingCreateView(APIView):
    permission_classes = [AllowAny]  # TODO: Web client can't access this endpoint
    authentication_classes = [APIKeyHeaderAuthentication]

    def post(self, request: Request) -> Response:
        serializer = BookingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Booking created successfully."}, status=status.HTTP_201_CREATED
        )
