from django.contrib import admin

from backend.apps.core.models import Pricing, SaunaConfig


@admin.register(SaunaConfig)
class SaunaConfigAdmin(admin.ModelAdmin):
    pass


@admin.register(Pricing)
class PricingAdmin(admin.ModelAdmin):
    pass
