import datetime as dt
from typing import Any

from django.core.cache import cache
from django.db import models
from django.utils import timezone

from backend.settings import DEFAULT_CONFIG


# when does database clean itself from outdated entries?
class SaunaConfig(models.Model):
    opening_time = models.TimeField(default=DEFAULT_CONFIG["opening_time"])
    closing_time = models.TimeField(default=DEFAULT_CONFIG["closing_time"])
    max_visitors_count = models.PositiveSmallIntegerField(
        default=DEFAULT_CONFIG["max_people_count"]
    )
    min_time_from_now_to_booking = models.DurationField(
        default=DEFAULT_CONFIG["min_time_from_now_to_booking"]
    )
    min_booking_time = models.DurationField(default=DEFAULT_CONFIG["min_booking_time"])
    min_time_between_bookings = models.DurationField(
        default=DEFAULT_CONFIG["min_time_between_bookings"]
    )
    check_30_min_multiplicity = models.BooleanField(
        default=DEFAULT_CONFIG["check_30_min_multiplicity"]
    )
    created = models.DateTimeField(auto_now_add=True)

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
            opening_dt = dt.datetime.combine(
                start_dt.date() - one_day, self.opening_time
            )
        else:
            opening_dt = dt.datetime.combine(start_dt.date(), self.opening_time)

        if self.opening_time < self.closing_time:
            closing_dt = dt.datetime.combine(opening_dt.date(), self.closing_time)
        else:
            closing_dt = dt.datetime.combine(
                opening_dt.date() + one_day, self.closing_time
            )

        return opening_dt <= start_dt and end_dt <= closing_dt

    def __str__(self) -> str:
        return f"Config on {self.created.astimezone(timezone.get_default_timezone()).strftime('%d.%m.%Y %H:%M')}"
