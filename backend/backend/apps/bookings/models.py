import datetime
from typing import Any

import validators
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

from backend.apps.customers.models import Customer
from backend.settings import DEFAULT_SETTINGS


# when does database clean itself from outdated entries?
class SaunaConfig(models.Model):
    opening_time = models.TimeField(default=DEFAULT_SETTINGS['opening_time'])
    closing_time = models.TimeField(default=DEFAULT_SETTINGS['closing_time'])
    max_visitors_count = models.PositiveSmallIntegerField(default=DEFAULT_SETTINGS['max_people_count'])
    max_bathrobes_count = models.PositiveSmallIntegerField(default=DEFAULT_SETTINGS['bathrobes_count'])
    min_time_from_now_to_booking = models.DurationField(default=DEFAULT_SETTINGS['min_time_from_now_to_booking'])
    min_booking_time = models.DurationField(default=DEFAULT_SETTINGS['min_booking_time'])
    min_time_between_bookings = models.DurationField(default=DEFAULT_SETTINGS['min_time_between_bookings'])
    check_30_min_multiplicity = models.BooleanField(default=DEFAULT_SETTINGS['check_30_min_multiplicity'])
    created = models.DateTimeField(default=datetime.datetime.now())

    def save(self, *args: tuple, **kwargs: dict[str, Any] | None) -> None:
        super().save(*args, **kwargs)
        cache.set("sauna_config", self)

    @classmethod
    def get(cls) -> "SaunaConfig":
        config = cache.get("sauna_config")
        if not config:
            config = cls.objects.first() or cls.objects.create()
            cache.set("sauna_config", config)
        return config


class ContactMethod(models.TextChoices):
    PHONE = "phone", "Phone"
    WHATSUP = "whatsup", "WhatsUp"
    TELEGRAM = "telegram", "Telegram"


class Booking(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT) # not sure about on_delete option, but it seems ok
    visitors_count = models.PositiveSmallIntegerField(validators=[validators.validate_visitors_count])
    date = models.DateField()
    start_time = models.DateTimeField(validators=[validators.validate_start_time])
    end_time = models.DateTimeField(validators=[validators.validate_end_time])
    bathrobes_count = models.PositiveSmallIntegerField(validators=[validators.validate_bathrobes_count])
    brooms_count = models.PositiveSmallIntegerField()
    preferred_contact_method = models.CharField(max_length=10, choices=ContactMethod)
    created = models.DateTimeField()

    def is_booking_time_available(self) -> None:
        buffer_time = SaunaConfig.get().min_time_between_bookings

        return Booking.objects.filter(
            start_datetime__lt=self.end_time + buffer_time,
            end_datetime__gt=self.start_time - buffer_time
        ).exclude(id=self.id).exists()

    def clean(self) -> None:
        sauna_config = SaunaConfig.get()

        if self.date < self.created:
            raise ValidationError(
                _("The booking day must not be earlier than the booking creation date."),
                params={'date': self.date,
                        'created': self.created},
                code="booking_date_before_creation",
            )

        if self.start_time.date() != self.date:
            raise ValidationError(
                _("The start date of the booking must match the date of the booking itself."),
                params={'start_time.date()': self.start_time.date(),
                        'date': self.date},
                code="start_date_mismatch",
            )

        if (self.end_time.date() != self.date and
            not (self.end_time.time() == datetime.time(0)
                and self.end_time.date == self.date + datetime.timedelta(days=1))):
            raise ValidationError(
                _("The end date of the booking must match the date of the booking itself or 0:00 of the next day."),
                params={'end_time.date()': self.end_time.date(),
                        'date': self.date},
                code="end_date_mismatch",
            )

        if self.start_time > self.end_time:
            raise ValidationError(
                _("The a time of the booking must be less than the end time."),
                params={'start_time': self.start_time,
                        'end_time': self.end_time},
                code="start_time_after_end",
            )

        if self.start_time - self.created < sauna_config.min_time_from_now_to_booking:
            raise ValidationError(
                _(f"There must be at least {sauna_config.min_time_from_now_to_booking} "
                  f"since the booking was created before the start of the booking."),
                params={'start_time': self.start_time,
                        'created': self.created,
                        'min_time_from_now_to_booking': sauna_config.min_time_from_now_to_booking},
                code="min_lead_time_not_met",

            )

        if self.end_time - self.start_time < sauna_config.min_booking_time:
            raise ValidationError(
                _(f"{sauna_config.min_booking_time} is the minimal booking duration."),
                params={'end_time': self.end_time,
                        'start_time': self.start_time,
                        'min_booking_time': sauna_config.min_booking_time},
                code="min_booking_duration_not_met",
            )

        if not self.is_booking_time_available():
            raise ValidationError(
                _(f"Bookings overlap with the existing one or there is not enough buffer in "
                  f"{sauna_config.min_time_between_bookings} between bookings"),
                code="unavailable_booking_time",
            )

    def __str__(self) -> str:
        return f'{self.customer} on {self.date} [{self.start_time} - {self.end_time}]'
        # may be change Customer.__str__ because there are can be a lot of simular nicknames
