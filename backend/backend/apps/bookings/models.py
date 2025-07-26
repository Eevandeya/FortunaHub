import datetime as dt

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

import backend.apps.bookings.validators as validators
from backend.apps.core.models import SaunaConfig
from backend.apps.customers.models import Customer


class Booking(models.Model):
    class ContactMethod(models.TextChoices):
        PHONE = "phone", "Phone"
        WHATSUP = "whatsup", "WhatsUp"
        TELEGRAM = "telegram", "Telegram"

    customer = models.ForeignKey(Customer, on_delete=models.PROTECT) # not sure about on_delete option, but it seems ok
    date = models.DateField()
    start_datetime = models.DateTimeField(validators=[validators.validate_start_time, validators.validate_time_step])
    end_datetime = models.DateTimeField(validators=[validators.validate_end_time, validators.validate_time_step])
    visitors_count = models.PositiveSmallIntegerField(validators=[validators.validate_visitors_count])
    bathrobes_count = models.PositiveSmallIntegerField(validators=[validators.validate_bathrobes_count])
    brooms_count = models.PositiveSmallIntegerField()
    preferred_contact_method = models.CharField(max_length=10, choices=ContactMethod)
    created = models.DateTimeField()

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
        sauna_config = SaunaConfig.get()

        if self.date < self.created.date():
            raise ValidationError(
                _("The booking day must not be earlier than the booking creation date."),
                params={"date": self.date,
                        "created": self.created},
                code="booking_date_before_creation",
            )

        if self.start_datetime.date() != self.date:
            raise ValidationError(
                _("The start date of the booking must match the date of the booking itself."),
                params={"start_time.date()": self.start_datetime.date(),
                        "date": self.date},
                code="start_date_mismatch",
            )

        if (self.end_datetime.date() != self.date and
            not (self.end_datetime.time() == dt.time(0)
                and self.end_datetime.date == self.date + dt.timedelta(days=1))):
            raise ValidationError(
                _("The end date of the booking must match the date of the booking itself or 0:00 of the next day."),
                params={"end_time.date()": self.end_datetime.date(),
                        "date": self.date},
                code="end_date_mismatch",
            )

        if self.start_datetime > self.end_datetime:
            raise ValidationError(
                _("The a time of the booking must be less than the end time."),
                params={"start_time": self.start_datetime,
                        "end_time": self.end_datetime},
                code="start_time_after_end",
            )

        if self.start_datetime - self.created < sauna_config.min_time_from_now_to_booking:
            raise ValidationError(
                _(f"There must be at least {sauna_config.min_time_from_now_to_booking} "
                  f"since the booking was created before the start of the booking."),
                params={"start_time": self.start_datetime,
                        "created": self.created,
                        "min_time_from_now_to_booking": sauna_config.min_time_from_now_to_booking},
                code="min_lead_time_not_met",

            )

        if self.end_datetime - self.start_datetime < sauna_config.min_booking_time:
            raise ValidationError(
                _(f"{sauna_config.min_booking_time} is the minimal booking duration."),
                params={"end_time": self.end_datetime,
                        "start_time": self.start_datetime,
                        "min_booking_time": sauna_config.min_booking_time},
                code="min_booking_duration_not_met",
            )

        if not self.is_booking_time_available():
            raise ValidationError(
                _(f"Bookings overlap with the existing one or there is not enough buffer in "
                  f"{sauna_config.min_time_between_bookings} between bookings"),
                code="unavailable_booking_time",
            )

    def __str__(self) -> str:
        """
        TODO: may be change Customer.__str__ because there are can be a lot of simular nicknames
        """
        return "{customer} on {date} [{start} - {end}]".format(customer=self.customer,
                                                               date=self.date,
                                                               start=self.dt_to_local(self.start_datetime).strftime("%H:%M"),
                                                               end=self.dt_to_local(self.end_datetime).strftime("%H:%M"))
