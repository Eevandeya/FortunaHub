from django.db import models


class Role(models.Model):
    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    description = models.CharField(blank=True, null=True, max_length=500)
    permissions = models.ManyToManyField("Permission", related_name="roles", blank=True)

    def __str__(self) -> str:
        return self.display_name


class Permission(models.Model):
    class Category(models.TextChoices):
        TABLE = "table", "Табличные (CRUD)"
        BUSINESS = "business", "Бизнес-логика"

    display_name = models.CharField(max_length=100)
    code = models.SlugField(
        unique=True, max_length=50
    )  # Create a validation for this format "can_<action>_<model>"?
    description = models.CharField(blank=True, null=True, max_length=500)
    category = models.CharField(
        max_length=20,
        choices=Category.choices,
    )

    def __str__(self) -> str:
        return f"{self.display_name} ({self.code})"
