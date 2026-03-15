from django.apps import AppConfig


class CatalogConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.apps.catalog"

    def ready(self) -> None:
        from backend.apps.catalog import signals  # noqa: F401
