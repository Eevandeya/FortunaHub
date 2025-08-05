from django.contrib import admin

from backend.apps.core.models import SaunaConfig


@admin.register(SaunaConfig)
class SaunaConfigAdmin(admin.ModelAdmin):
    pass
