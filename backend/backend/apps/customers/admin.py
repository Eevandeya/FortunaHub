from django.contrib import admin

from backend.apps.customers.models import Customer, CustomerContact


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(CustomerContact)
class CustomerContactAdmin(admin.ModelAdmin):
    pass
