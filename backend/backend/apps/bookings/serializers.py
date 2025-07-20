from django.utils.timezone import get_default_timezone
from rest_framework import serializers

from backend.services.booking_service import TimeSlot


class TimeSlotSerializer(serializers.Serializer):
    def to_representation(self, obj: TimeSlot) -> dict:
        tz = get_default_timezone()
        return {
            "start": obj.start.astimezone(tz=tz).strftime("%H:%M"),
            "end": obj.end.astimezone(tz=tz).strftime("%H:%M"),
        }


class FreeSlotsResponseSerializer(serializers.Serializer):
    date = serializers.DateField()
    free_slots = TimeSlotSerializer(many=True)
