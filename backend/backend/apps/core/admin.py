from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import SafeString

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
    list_display = ("id", "display_name", "is_active", "image_preview")
    list_editable = ("is_active",)
    list_display_links = ("display_name", "image_preview")

    @admin.display(description="Preview")
    def image_preview(self, obj: SaunaGallery) -> SafeString:
        if obj.image:
            return format_html(
                "<img src='{url}' style='height: 80px; border-radius: 6px;' />",
                url=obj.image.url,
            )
        return SafeString("—")
