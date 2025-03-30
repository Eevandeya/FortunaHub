from django.urls import path

from .views import FreeBookingTime

app_name = "bookings"

urlpatterns = [
    path("get-free-booking-time/", FreeBookingTime.as_view(), name="get_free_booking_time"),
]
