from django.contrib import admin

from backend.apps.permissions.models import Permission


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    pass
