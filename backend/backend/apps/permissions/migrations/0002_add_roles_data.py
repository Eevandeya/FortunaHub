from django.apps.registry import Apps
from django.db import migrations
from django.db.backends.base.schema import BaseDatabaseSchemaEditor


def create_default_roles(apps: Apps, _: BaseDatabaseSchemaEditor) -> None:
    role_model = apps.get_model("permissions", "Role")
    permission_model = apps.get_model("permissions", "Permission")

    # TODO: How to ensure that the requested permissions exist?
    all_permissions_slugs = list(
        permission_model.objects.values_list("slug", flat=True)
    )
    roles = [
        {
            "display_name": "Директор",
            "slug": "director",
            "description": 'Директор ООО "Фортуна"',
            "permissions": all_permissions_slugs,
        },
        {
            "display_name": "Администратор",
            "slug": "admin",
            "description": 'Администратор ООО "Фортуна"',
            "permissions": all_permissions_slugs,
        },
        {
            "display_name": "Разработчик",
            "slug": "developer",
            "description": 'Разработчик IT сервисов для ООО "Фортуна"',
            "permissions": all_permissions_slugs,
        },
    ]

    for role in roles:
        new_permissions: list[str] = role.pop("permissions")
        obj, created = role_model.objects.get_or_create(
            slug=role["slug"], defaults=role
        )
        if created:
            obj.permissions.set(
                permission_model.objects.filter(slug__in=new_permissions)
            )
            continue

        fields_updated = False
        for field in ("display_name", "description"):
            if getattr(obj, field) != role.get(field):
                setattr(obj, field, role.get(field))
                fields_updated = True
        if fields_updated:
            obj.save()

        old_permissions = obj.permissions.values_list("slug", flat=True)
        if set(old_permissions) != set(new_permissions):
            obj.permissions.set(
                permission_model.objects.filter(slug__in=new_permissions)
            )


class Migration(migrations.Migration):
    dependencies = [
        ("permissions", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_default_roles),
    ]
