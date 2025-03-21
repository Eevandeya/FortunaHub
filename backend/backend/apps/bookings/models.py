import datetime
from typing import Any

from django.core.cache import cache
from django.db import models

from backend.settings import DEFAULT_SETTINGS


# when does database clean itself from outdated entries?
class SaunaConfig(models.Model):
    opening_time = models.TimeField(default=DEFAULT_SETTINGS['opening_time'])
    closing_time = models.TimeField(default=DEFAULT_SETTINGS['closing_time'])
    max_people_count = models.PositiveSmallIntegerField(default=DEFAULT_SETTINGS['max_people_count'])
    bathrobes_count = models.PositiveSmallIntegerField(default=DEFAULT_SETTINGS['bathrobes_count'])
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
