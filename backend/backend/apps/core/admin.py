from django.contrib import admin

from .models import SaunaConfig


@admin.register(SaunaConfig)
class SaunaConfigAdmin(admin.ModelAdmin):
    pass
