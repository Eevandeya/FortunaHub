from django.contrib import admin

from backend.apps.staff.models import Permission, Role, Staff


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    pass


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    pass


@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    pass
