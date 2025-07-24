from django.urls import path

from .views import FreeBookingTimeView

app_name = "bookings"

urlpatterns = [
    path("free-slots/", FreeBookingTimeView.as_view(), name="free_slots"),
]
