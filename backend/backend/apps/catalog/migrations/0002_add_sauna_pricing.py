from decimal import Decimal

from django.apps.registry import Apps
from django.db import migrations
from django.db.backends.base.schema import BaseDatabaseSchemaEditor


def create_default_sauna_pricing(apps: Apps, _: BaseDatabaseSchemaEditor) -> None:
    sauna_pricing_model = apps.get_model("catalog", "SaunaPricing")
    defaults = [
        {
            "display_name": "Почасовая аренда",
            "slug": "hourly_rent",
            "description": "Цена аренды за 1 час",
            "price": Decimal("5000.00"),
        },
        {
            "display_name": "Предоплата",
            "slug": "prepayment",
            "description": "Сумма предоплаты за бронирование",
            "price": Decimal("2000.00"),
        },
    ]

    for item in defaults:
        obj, created = sauna_pricing_model.objects.get_or_create(
            slug=item.pop("slug"), defaults=item
        )
        if not created:
            updated = False
            for k, v in item.items():
                if getattr(obj, k) != v:
                    updated = True
                    setattr(obj, k, v)
            if updated:
                obj.save()


class Migration(migrations.Migration):
    dependencies = [
        ("catalog", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_default_sauna_pricing),
    ]
