import datetime as dt
from decimal import Decimal
from typing import Any

from django.core.cache import cache
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone

from backend.apps.core.exceptions import MissingInitialDataError


class SaunaConfig(models.Model):
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    max_visitors_count = models.PositiveSmallIntegerField()
    min_time_from_now_to_booking = models.DurationField()
    min_booking_time = models.DurationField()
    min_time_between_bookings = models.DurationField()
    check_30_min_multiplicity = models.BooleanField()
    created = models.DateTimeField(auto_now_add=True)

    @classmethod
    def get(cls) -> "SaunaConfig":
        config = cls.objects.order_by("-created").first()
        if not config:
            raise MissingInitialDataError(cls, "sauna_config") from None
        return config

    def get_opening_and_closing_dt(
        self, date: dt.date
    ) -> tuple[dt.datetime, dt.datetime]:
        opening = timezone.make_aware(dt.datetime.combine(date, self.opening_time))
        closing = timezone.make_aware(dt.datetime.combine(date, self.closing_time))
        if closing <= opening:
            closing += dt.timedelta(days=1)
        return opening, closing

    def is_booking_within_open_hours(
        self, start_dt: dt.datetime, end_dt: dt.datetime
    ) -> bool:
        one_day = dt.timedelta(days=1)

        if start_dt.time() < self.opening_time:
            opening_dt = timezone.make_aware(
                dt.datetime.combine(start_dt.date() - one_day, self.opening_time)
            )
        else:
            opening_dt = timezone.make_aware(
                dt.datetime.combine(start_dt.date(), self.opening_time)
            )

        if self.opening_time < self.closing_time:
            closing_dt = timezone.make_aware(
                dt.datetime.combine(opening_dt.date(), self.closing_time)
            )
        else:
            closing_dt = timezone.make_aware(
                dt.datetime.combine(opening_dt.date() + one_day, self.closing_time)
            )

        return opening_dt <= start_dt and end_dt <= closing_dt

    def __str__(self) -> str:
        return f"Config on {self.created.astimezone(timezone.get_default_timezone()).strftime('%d.%m.%Y %H:%M')}"


class Pricing(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=255)
    updated = models.DateTimeField(auto_now=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)]
    )

    def save(self, *args: tuple, **kwargs: dict[str, Any]) -> None:
        super().save(*args, **kwargs)
        if self.name in ("hourly_rent", "prepayment"):
            cache.set(f"pricing:{self.name}", self)

    @classmethod
    def get_hourly_rent_and_prepayment(
        cls,
    ) -> tuple[
        Decimal, Decimal
    ]:  # Maybe it is worth dividing into 2 independent methods
        hourly_rent = cache.get("pricing:hourly_rent")
        if hourly_rent is None:
            hourly_rent = cls.objects.get(name="hourly_rent")
            if hourly_rent is None:
                raise MissingInitialDataError
            cache.set("pricing:hourly_rent", hourly_rent)
        prepayment = cache.get("pricing:prepayment")
        if prepayment is None:
            prepayment = cls.objects.get(name="prepayment")
            if prepayment is None:
                raise MissingInitialDataError
            cache.set("pricing:prepayment", prepayment)
        return hourly_rent.price, prepayment.price

    def __str__(self) -> str:
        return f"{self.name} {self.price} RUB"
