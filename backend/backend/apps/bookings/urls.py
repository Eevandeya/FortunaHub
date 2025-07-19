from django.urls import path

from .views import FreeBookingTime

app_name = "bookings"

urlpatterns = [
    path("free-slots/", FreeBookingTime.as_view(), name="free_slots"),
]
