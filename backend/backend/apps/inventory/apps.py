from django.apps import AppConfig


class InventoryConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.apps.inventory"

    def ready(self) -> None:
        from backend.apps.inventory import signals  # noqa: F401
