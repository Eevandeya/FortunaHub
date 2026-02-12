from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.apps.core"

    def ready(self) -> None:
        from backend.apps.core import signals  # noqa: F401
