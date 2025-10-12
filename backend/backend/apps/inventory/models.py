from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models

from backend.apps.bookings.models import Booking


class InventoryItem(models.Model):
    class ItemType(models.TextChoices):
        RENTED = "rented"
        CONSUMABLE = "consumable"

    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    quantity = models.PositiveIntegerField(default=0)
    item_type = models.CharField(choices=ItemType.choices, max_length=10)
    updated = models.DateTimeField(auto_now=True)

    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            MinValueValidator(Decimal("0.01"))
        ],  # Besplatni sir only in mishelovka
    )

    def is_available(self, quantity: int) -> bool:
        if quantity <= 0:
            raise ValueError("Quantity must be greater than zero.")

        return self.quantity >= quantity

    def __str__(self) -> str:
        return f"{self.display_name} ({self.slug})"


class BookingItem(models.Model):
    booking = models.ForeignKey(Booking, related_name="items", on_delete=models.CASCADE)
    inventory_item = models.ForeignKey(InventoryItem, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()

    def __str__(self) -> str:
        return f"{self.inventory_item} - {self.quantity}"
