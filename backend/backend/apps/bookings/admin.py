from django.contrib import admin

from backend.apps.bookings.models import Booking, BookingPayment


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    pass


@admin.register(BookingPayment)
class BookingPaymentAdmin(admin.ModelAdmin):
    pass
