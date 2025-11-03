from django.contrib import admin

from backend.apps.permissions.models import Permission, Role


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    pass


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    pass
