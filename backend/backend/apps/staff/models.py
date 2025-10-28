from django.db import models

from backend.apps.staff.validators import validate_phone_number


class Role(models.Model):
    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    description = models.CharField(blank=True, null=True, max_length=500)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # For the future
    is_active = models.BooleanField(default=True)
    permissions = models.JSONField(default=dict, blank=True)

    def __str__(self) -> str:
        return self.display_name


class Staff(models.Model):
    telegram_user_id = models.BigIntegerField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    roles = models.ManyToManyField("Role", related_name="staff")
    phone_number = models.CharField(
        max_length=20, validators=[validate_phone_number], unique=True
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    description = models.CharField(blank=True, null=True, max_length=500)

    def __str__(self) -> str:
        roles = ", ".join(role.display_name for role in self.roles.all())
        return f"{self.first_name} {self.last_name} - [{roles}]"
