from django.core.validators import MinValueValidator
from django.db import models


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
        validators=[MinValueValidator(0.01)], # Besplatni sir only in mishelovka
    )

    def __str__(self) -> str:
        return f"{self.display_name} ({self.slug})"
