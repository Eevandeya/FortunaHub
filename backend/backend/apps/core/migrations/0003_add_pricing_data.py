from decimal import Decimal

from django.apps.registry import Apps
from django.db import migrations
from django.db.backends.base.schema import BaseDatabaseSchemaEditor


def create_default_pricing(apps: Apps, _: BaseDatabaseSchemaEditor) -> None:
    pricing_model = apps.get_model("sauna", "Pricing")

    defaults = [
        {
            "name": "hourly_rent",
            "description": "Цена аренды за 1 час",
            "price": Decimal("5000.00"),
        },
        {
            "name": "prepayment",
            "description": "Сумма предоплаты за бронирование",
            "price": Decimal("2000.00"),
        },
    ]

    for item in defaults:
        obj, created = pricing_model.objects.get_or_create(
            name=item["name"],
            defaults={
                "description": item["description"],
                "price": item["price"],
            },
        )
        if not created:
            updated = False
            if obj.description != item["description"]:
                obj.description = item["description"]
                updated = True
            if obj.price != item["price"]:
                obj.price = item["price"]
                updated = True
            if updated:
                obj.save()


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0002_add_sauna_config_data"),
    ]

    operations = [
        migrations.RunPython(create_default_pricing),
    ]
