from django.apps.registry import Apps
from django.db import migrations
from django.db.backends.base.schema import BaseDatabaseSchemaEditor


def create_default_permissions(apps: Apps, _: BaseDatabaseSchemaEditor) -> None:
    permission_model = apps.get_model("permissions", "Permission")
    permissions = [
        # Add in the future
    ]

    for permission in permissions:
        obj, created = permission_model.objects.get_or_create(
            slug=permission["slug"], defaults=permission
        )
        if not created:
            updated = False
            for field in ("display_name", "description"):
                if getattr(obj, field) != permission.get(field):
                    setattr(obj, field, permission.get(field))
                    updated = True
            if updated:
                obj.save()


class Migration(migrations.Migration):
    dependencies = [
        ("permissions", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_default_permissions),
    ]
