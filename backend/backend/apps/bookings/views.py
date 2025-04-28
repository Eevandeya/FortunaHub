from datetime import datetime

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .auth import APIKeyHeaderAuthentication


class FreeBookingTime(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [APIKeyHeaderAuthentication]

    def post(self, request: Request) -> Response:
        if not request.data:
            return Response({"error": "No data provided"},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            date_str = request.data.get("date")
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")  # Format: "2023-10-20"
        except (ValueError, TypeError):
            return Response({"error": "Invalid date format. Use YYYY-MM-DD"},
                            status=status.HTTP_400_BAD_REQUEST)

        # The idea of business logic
        _ = date_obj
        intervals = []
        return Response({"free_booking_time": intervals})
