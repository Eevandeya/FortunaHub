import datetime as dt

from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from backend.apps.bookings.validators import validate_time_step, validate_visitors_count
from backend.apps.core.models import SaunaConfig
from backend.apps.customers.models import Customer


class Booking(models.Model):
    class ContactMethod(models.TextChoices):
        PHONE = "phone", "Phone"
        WHATSUP = "whatsup", "WhatsUp"
        TELEGRAM = "telegram", "Telegram"

    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    start_datetime = models.DateTimeField(validators=[validate_time_step])
    end_datetime = models.DateTimeField(validators=[validate_time_step])
    visitors_count = models.PositiveSmallIntegerField(validators=[validate_visitors_count])
    preferred_contact_method = models.CharField(max_length=10, choices=ContactMethod)
    created = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def dt_to_local(value: dt.datetime) -> dt.datetime:
        if timezone.is_naive(value):
            raise ValueError("Value [Datetime] must be timezone-aware (USE_TZ=True)")
        return value.astimezone(timezone.get_default_timezone())

    def is_booking_time_available(self) -> bool:
        buffer_time = SaunaConfig.get().min_time_between_bookings

        return not (Booking.objects.filter(
            start_datetime__lt=self.end_datetime + buffer_time,
            end_datetime__gt=self.start_datetime - buffer_time
        ).exclude(id=self.id).exists())

    def clean(self) -> None:
        super().clean()
        sauna_config = SaunaConfig.get()
        now = timezone.now()

        errors = {}

        if self.start_datetime > self.end_datetime:
            errors.setdefault("non_field_errors", []).append(
                DjangoValidationError(
                    _("The start time must be before the end time."),
                    code="start_time_after_end",
                    params={
                        "start_datetime": self.start_datetime,
                        "end_datetime": self.end_datetime,
                    },
                )
            )

        if self.start_datetime - now < dt.timedelta(seconds=0):
            errors.setdefault("non_field_errors", []).append(
                DjangoValidationError(
                    _("Booking date cannot be in the past."),
                    params={
                        "start_datetime": self.start_datetime,
                        "now": now,
                    },
                    code="past_booking_time_not_allowed",
                )
            )

        elif self.start_datetime - now < sauna_config.min_time_from_now_to_booking:
            errors.setdefault("non_field_errors", []).append(
                DjangoValidationError(
                    _(f"There must be at least {sauna_config.min_time_from_now_to_booking} "
                      f"since the booking was created before the start of the booking."),
                    params={
                        "start_datetime": self.start_datetime,
                        "now": now,
                        "min_time_from_now_to_booking": sauna_config.min_time_from_now_to_booking
                    },
                    code="min_lead_time_not_met"
                )
            )

        if self.end_datetime - self.start_datetime < sauna_config.min_booking_time:
            errors.setdefault("non_field_errors", []).append(
                DjangoValidationError(
                    _(
                        f"{sauna_config.min_booking_time} is the minimal booking duration."
                    ),
                    code="min_booking_duration_not_met",
                    params={
                        "start_datetime": self.start_datetime,
                        "end_datetime": self.end_datetime,
                        "min_booking_time": sauna_config.min_booking_time,
                    },
                )
            )

        if not sauna_config.is_booking_within_open_hours(self.start_datetime, self.end_datetime):
            errors.setdefault("non_field_errors", []).append(
                DjangoValidationError(
                    _("The booking time goes beyond the opening hours."),
                    code="outside_opening_hours",
                    params={
                        "start_datetime": self.start_datetime,
                        "end_datetime": self.end_datetime,
                        "opening_time": sauna_config.opening_time,
                        "closing_time": sauna_config.closing_time,
                    },
                )
            )

        if not self.is_booking_time_available():
            errors.setdefault("non_field_errors", []).append(
                DjangoValidationError(
                    _(
                        f"Bookings overlap with the existing one or there is not enough buffer in "
                        f"{sauna_config.min_time_between_bookings} between bookings"
                    ),
                    code="unavailable_booking_time",
                    params={
                        "start_datetime": self.start_datetime,
                        "end_datetime": self.end_datetime,
                        "min_time_between_bookings": sauna_config.min_time_between_bookings,
                    },
                )
            )

        if errors:
            raise DjangoValidationError(errors)

    def __str__(self) -> str:
        """
        TODO: may be change Customer.__str__ because there are can be a lot of simular nicknames
        """
        return "{customer} on {date} [{start} - {end}]".format(customer=self.customer,
                                                               date=self.dt_to_local(self.start_datetime).date(),
                                                               start=self.dt_to_local(self.start_datetime).strftime("%H:%M"),
                                                               end=self.dt_to_local(self.end_datetime).strftime("%H:%M"))
