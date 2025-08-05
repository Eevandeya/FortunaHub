import datetime

from rest_framework import serializers

from backend.apps.core.models import SaunaConfig

TIME_FORMAT = "%H:%M"


class SaunaConfigSerializer(serializers.ModelSerializer):
    opening_time = serializers.TimeField(format=TIME_FORMAT)
    closing_time = serializers.TimeField(format=TIME_FORMAT)

    class Meta:
        model = SaunaConfig
        exclude = ["id"]

    @staticmethod
    def format_duration(duration: datetime.timedelta) -> str:
        total_seconds = int(duration.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{hours:02}:{minutes:02}"

    def to_representation(self, instance: SaunaConfig) -> dict:
        data = super().to_representation(instance)

        # Convert durations to string format HH:MM.
        # Because these fields are timedelta, we can't use strftime directly to format them to %H:%M,
        # so we need to convert them by hand.
        data["min_time_from_now_to_booking"] = self.format_duration(
            instance.min_time_from_now_to_booking
        )
        data["min_booking_time"] = self.format_duration(instance.min_booking_time)
        data["min_time_between_bookings"] = self.format_duration(
            instance.min_time_between_bookings
        )
        return data
