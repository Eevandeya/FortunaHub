from django.contrib import admin

from backend.apps.staff.models import Staff


@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    pass
