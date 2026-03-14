from django.apps import AppConfig


class CatalogConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.apps.products"

    def ready(self) -> None:
        from backend.apps.products import signals  # noqa: F401
