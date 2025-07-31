from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
from django.utils.timezone import get_default_timezone
from rest_framework import serializers

from backend.apps.bookings.models import Booking
from backend.apps.customers.serializers import CustomerSerializer
from backend.apps.inventory.models import InventoryItem
from backend.apps.inventory.serializers import BookingItemSerializer
from backend.services.booking_service import TimeSlot
from backend.services.customer_service import handle_customer_visit
from backend.services.inventory_service import (
    add_item_to_booking,
    is_inventory_item_available,
)


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


class BookingSerializer(serializers.Serializer):
    customer = CustomerSerializer(required=True)
    items = BookingItemSerializer(many=True, required=False)

    start_datetime = serializers.DateTimeField(required=True)
    end_datetime = serializers.DateTimeField(required=True)
    visitors_count = serializers.IntegerField(min_value=1, required=True)
    preferred_contact_method = serializers.ChoiceField(
        choices=Booking.ContactMethod.choices,
        required=True,  # TODO: Add endpoint for contact methods
    )

    @staticmethod
    def format_validation_error(
        e: DjangoValidationError,
    ) -> dict[str, list[dict[str, str | int | None] | str]]:
        # We can move this method to other place if needed
        formatted: dict[
            str, list[dict[str, str | int | None] | str]
        ] = {}  # Why should I annotate this...

        if hasattr(e, "error_dict"):
            for field, errors in e.error_dict.items():
                formatted[field] = []
                for err in errors:
                    formatted[field].append(
                        {
                            "message": str(err.message),
                            "code": err.code,
                            "params": getattr(err, "params", None),
                        }
                    )

        elif hasattr(e, "error_list"):
            formatted["non_field_errors"] = []
            for err in e.error_list:
                formatted["non_field_errors"].append(
                    {
                        "message": str(err.message),
                        "code": err.code,
                        "params": getattr(err, "params", None),
                    }
                )

        else:
            formatted["non_field_errors"] = [str(e)]

        return formatted

    @transaction.atomic
    def create(self, validated_data: dict) -> Booking:
        customer_data = validated_data.pop("customer", {})
        items_data = validated_data.pop("items", [])

        if not customer_data:
            # TODO: Log it
            raise ValueError({"customer": "Customer data is required."})

        customer_obj = handle_customer_visit(
            customer_data, validated_data["start_datetime"].date()
        )

        booking = Booking(customer=customer_obj, **validated_data)

        try:
            booking.full_clean()
            booking.save()
        except DjangoValidationError as e:
            raise serializers.ValidationError(self.format_validation_error(e)) from None

        items = InventoryItem.objects.get_cached_items()

        item_errors = {}
        for item_data in items_data:
            if not is_inventory_item_available(
                item_data["quantity"], items[item_data["slug"]]
            ):
                item_errors.setdefault(item_data["slug"], []).append(
                    "Not enough stock."
                )

        if item_errors:
            raise serializers.ValidationError({"items": item_errors})

        for item_data in items_data:
            _, item_obj = add_item_to_booking(
                booking, item_data["quantity"], items[item_data["slug"]]
            )
            InventoryItem.objects.update_cache(item_obj)

        return booking
