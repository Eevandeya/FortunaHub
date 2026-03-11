import datetime as dt
from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone

from backend.apps.core.exceptions import MissingInitialDataError


class SaunaSettings(models.Model):
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    max_visitors_count = models.PositiveSmallIntegerField()
    min_time_before_booking = models.DurationField()
    min_booking_time = models.DurationField()
    min_time_between_bookings = models.DurationField()
    created = models.DateTimeField(auto_now_add=True)

    @classmethod
    def get(cls) -> "SaunaSettings":
        config = cls.objects.order_by("-created").first()
        if not config:
            raise MissingInitialDataError(cls, "sauna_settings") from None
        return config

    def get_opening_and_closing_dt(
        self, date: dt.date
    ) -> tuple[dt.datetime, dt.datetime]:
        opening = timezone.make_aware(dt.datetime.combine(date, self.opening_time))
        closing = timezone.make_aware(dt.datetime.combine(date, self.closing_time))
        if closing <= opening:
            closing += dt.timedelta(days=1)
        return opening, closing

    def __str__(self) -> str:
        return f"Config on {self.created.astimezone(timezone.get_default_timezone()).strftime('%d.%m.%Y %H:%M')}"


class Pricing(models.Model):
    name = models.CharField(
        max_length=100, unique=True
    )  # Make it a Slug type, raname "name" to "slug"? Add display_name field?
    description = models.CharField(max_length=255)
    updated = models.DateTimeField(auto_now=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)]
    )

    @classmethod
    def get_hourly_rent_price(cls) -> Decimal:
        try:
            return cls.objects.get(name="hourly_rent").price
        except cls.DoesNotExist:
            raise MissingInitialDataError(cls, "hourly_rent") from None

    @classmethod
    def get_prepayment_amount(cls) -> Decimal:
        try:
            return cls.objects.get(name="prepayment").price
        except cls.DoesNotExist:
            raise MissingInitialDataError(cls, "prepayment") from None

    def __str__(self) -> str:
        return f"{self.name} {self.price} RUB"


class SaunaGallery(models.Model):
    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    image = models.ImageField(upload_to="images/sauna_gallery", null=True, blank=True)
    is_active = models.BooleanField(default=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.display_name
