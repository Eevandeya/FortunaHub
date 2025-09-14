from django.conf import settings
from django.core.exceptions import NON_FIELD_ERRORS
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
from django.utils.timezone import get_default_timezone
from rest_framework import serializers

from backend.apps.bookings.models import Booking
from backend.apps.customers.serializers import CustomerSerializer
from backend.apps.inventory.serializers import (
    BookingItemRequestSerializer,
    BookingItemResponseSerializer,
)
from backend.services.booking_service import TimeSlot
from backend.services.customer_service import handle_customer_visit
from backend.services.inventory_service import (
    process_booking_items,
)
from backend.services.pricing_service import BookingPricingResult

EXTERNAL_NON_FIELD_ERRORS = "non_field_errors"


class TimeSlotSerializer(serializers.Serializer):
    # These fields are declared for openAPI schemas
    start = serializers.TimeField(format="%H:%M", read_only=True)
    end = serializers.TimeField(format="%H:%M", read_only=True)

    def to_representation(self, obj: TimeSlot) -> dict:
        tz = get_default_timezone()
        return {
            "start": obj.start.astimezone(tz=tz).strftime("%H:%M"),
            "end": obj.end.astimezone(tz=tz).strftime("%H:%M"),
        }


class FreeSlotsResponseSerializer(serializers.Serializer):
    date = serializers.DateField()
    free_slots = TimeSlotSerializer(many=True)


class BookingCreateSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    created = serializers.DateTimeField(read_only=True)

    customer = CustomerSerializer(required=True)
    items = BookingItemRequestSerializer(many=True, required=False, write_only=True)

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
                # convert django's "__all__" to our "non_field_errors"
                field = (
                    EXTERNAL_NON_FIELD_ERRORS if field == NON_FIELD_ERRORS else field
                )

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
            formatted[EXTERNAL_NON_FIELD_ERRORS] = []
            for err in e.error_list:
                formatted[EXTERNAL_NON_FIELD_ERRORS].append(
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
        customer_data = validated_data.pop("customer")
        items_data = validated_data.pop("items", [])

        customer_obj = handle_customer_visit(
            customer_data["nickname"],
            customer_data["phone_number"],
            validated_data["start_datetime"].date(),
        )

        booking = Booking(customer=customer_obj, **validated_data)

        try:
            booking.full_clean()
            booking.save()
        except DjangoValidationError as e:
            raise serializers.ValidationError(self.format_validation_error(e)) from None

        item_errors = process_booking_items(booking, items_data)
        if item_errors:
            raise serializers.ValidationError({"items": item_errors})

        return booking


class BookingResponseSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    items = BookingItemResponseSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "created",
            "customer",
            "start_datetime",
            "end_datetime",
            "visitors_count",
            "preferred_contact_method",
            "items",
        ]


class BookingPriceRequestSerializer(serializers.Serializer):
    items = BookingItemRequestSerializer(many=True, required=False)
    start_datetime = serializers.DateTimeField(required=True)
    end_datetime = serializers.DateTimeField(required=True)


class CurrencySerializer(serializers.Serializer):
    code = serializers.SerializerMethodField(read_only=True)

    def get_code(self, _obj: BookingPricingResult) -> str:
        return settings.CASH_CURRENCY_CODE


class BookingPriceResponseSerializer(serializers.Serializer):
    base_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    items_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    currency = CurrencySerializer(source="*")
    duration = serializers.SerializerMethodField()

    def get_duration(self, obj: BookingPricingResult) -> str:
        total_seconds = int(obj.duration.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{hours:02}:{minutes:02}"
