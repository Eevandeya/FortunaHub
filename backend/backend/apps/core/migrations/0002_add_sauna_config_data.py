import datetime

from django.apps.registry import Apps
from django.db import migrations
from django.db.backends.base.schema import BaseDatabaseSchemaEditor


def create_default_sauna_config(apps: Apps, _: BaseDatabaseSchemaEditor) -> None:
    sauna_config_model = apps.get_model("core", "SaunaConfig")
    sauna_config_model.objects.create(
        opening_time=datetime.time(8),
        closing_time=datetime.time(0),
        max_visitors_count=4,
        min_time_from_now_to_booking=datetime.timedelta(hours=2, minutes=30),
        min_booking_time=datetime.timedelta(hours=2),
        min_time_between_bookings=datetime.timedelta(hours=1),
    )


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_default_sauna_config),
    ]
