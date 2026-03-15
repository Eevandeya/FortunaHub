from decimal import Decimal

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models

from backend.apps.catalog.exceptions import MissingInitialDataError


class BaseProduct(models.Model):
    class Meta:
        abstract = True

    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    description = models.TextField(max_length=500)
    is_active = models.BooleanField(default=True)
    updated = models.DateTimeField(auto_now=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            MinValueValidator(Decimal("0.01"))
        ],  # Besplatni sir only in mishelovka
    )

    def __str__(self) -> str:
        return f"{self.display_name} ({self.slug}) - {self.price} {settings.CASH_CURRENCY_CODE}"


class InventoryItem(BaseProduct):
    class ItemType(models.TextChoices):
        RENTED = "rented", "Rented"
        CONSUMABLE = "consumable", "Consumable"

    image = models.ImageField(upload_to="images/inventory_items", null=True, blank=True)
    quantity = models.PositiveIntegerField(default=0)
    item_type = models.CharField(choices=ItemType.choices, max_length=10)

    def is_available(self, quantity: int) -> bool:
        if quantity <= 0:
            raise ValueError("Quantity must be greater than zero.")
        return self.quantity >= quantity


class SaunaPricing(BaseProduct):
    # TODO: Don't forget to solve the problem of
    #       the `is_active=False` field for
    #       `hourly_rent` and `prepayment`

    @classmethod
    def get_hourly_rent_price(cls) -> Decimal:
        try:
            return cls.objects.get(slug="hourly_rent").price
        except cls.DoesNotExist as error:
            raise MissingInitialDataError(cls, "hourly_rent") from error

    @classmethod
    def get_prepayment_price(cls) -> Decimal:
        try:
            return cls.objects.get(slug="prepayment").price
        except cls.DoesNotExist as error:
            raise MissingInitialDataError(cls, "prepayment") from error
