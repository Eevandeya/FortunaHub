from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import SafeString

from backend.apps.catalog.models import InventoryItem, SaunaPricing


@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("display_name",)}
    list_display = ("id", "display_name", "price", "is_active", "image_preview")
    list_editable = ("is_active",)
    list_display_links = ("display_name", "image_preview")

    @admin.display(description="Preview")
    def image_preview(self, obj: InventoryItem) -> SafeString:
        if obj.image:
            return format_html(
                "<img src='{url}' style='height: 80px; border-radius: 6px;' />",
                url=obj.image.url,
            )
        return SafeString("—")


@admin.register(SaunaPricing)
class SaunaPricingAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("display_name",)}
