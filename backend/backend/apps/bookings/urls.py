from django.urls import path

from backend.apps.bookings.views import (
    BookingCreateView,
    BookingPriceCalculationView,
    FreeBookingTimeView,
)

app_name = "bookings"

urlpatterns = [
    path("free-slots/", FreeBookingTimeView.as_view(), name="free_slots"),
    path("create/", BookingCreateView.as_view(), name="create_booking"),
    path("calculate/", BookingPriceCalculationView.as_view(), name="calculate"),
]
