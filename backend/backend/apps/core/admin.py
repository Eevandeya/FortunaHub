from django.contrib import admin

from backend.apps.core.models import Pricing, SaunaConfig, SaunaGallery


@admin.register(SaunaConfig)
class SaunaConfigAdmin(admin.ModelAdmin):
    pass


@admin.register(Pricing)
class PricingAdmin(admin.ModelAdmin):
    pass


@admin.register(SaunaGallery)
class SaunaGalleryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("display_name",)}
