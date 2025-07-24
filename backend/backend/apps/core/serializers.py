import datetime

from rest_framework import serializers

from .models import SaunaConfig

TIME_FORMAT = "%H:%M"

class SaunaConfigSerializer(serializers.ModelSerializer):
    opening_time = serializers.TimeField(format=TIME_FORMAT)
    closing_time = serializers.TimeField(format=TIME_FORMAT)

    # Convert durations to string format HH:MM
    min_time_from_now_to_booking = serializers.SerializerMethodField()
    min_booking_time = serializers.SerializerMethodField()
    min_time_between_bookings = serializers.SerializerMethodField()

    class Meta:
        model = SaunaConfig
        exclude = ["id"]

    @staticmethod
    def format_duration(duration: datetime.timedelta) -> str:
        total_seconds = int(duration.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{hours:02}:{minutes:02}"

    def get_min_time_from_now_to_booking(self, obj: SaunaConfig) -> str:
        return self.format_duration(obj.min_time_from_now_to_booking)

    def get_min_booking_time(self, obj: SaunaConfig) -> str:
        return self.format_duration(obj.min_booking_time)

    def get_min_time_between_bookings(self, obj: SaunaConfig) -> str:
        return self.format_duration(obj.min_time_between_bookings)
