from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models


class Product(models.Model):
    class ProductType(models.TextChoices):
        RENTED = "rented"
        CONSUMABLE = "consumable"

    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    description = models.TextField(max_length=500)
    image = models.ImageField(upload_to="images/products", null=True, blank=True)
    is_active = models.BooleanField(default=True)
    quantity = models.PositiveIntegerField(default=0)
    product_type = models.CharField(choices=ProductType.choices, max_length=10)
    updated = models.DateTimeField(auto_now=True)

    price = models.DecimalField(
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
