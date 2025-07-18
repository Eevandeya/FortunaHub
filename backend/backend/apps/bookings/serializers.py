from django.utils.timezone import get_current_timezone
from rest_framework import serializers

from backend.services.booking_service import TimeSlot


class TimeSlotSerializer(serializers.Serializer):
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()

    def get_start(self, obj: TimeSlot) -> str:
        local_start = obj.start.astimezone(get_current_timezone())
        return local_start.strftime("%H:%M")

    def get_end(self, obj: TimeSlot) -> str:
        local_end = obj.end.astimezone(get_current_timezone())
        return local_end.strftime("%H:%M")


class FreeSlotsResponseSerializer(serializers.Serializer):
    date = serializers.DateField()
    free_slots = TimeSlotSerializer(many=True)
