from django.db import models

from backend.validators.django_validators import validate_phone_number


class Permission(models.Model):
    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    description = models.CharField(blank=True, max_length=500)

    def __str__(self) -> str:
        return f"{self.display_name} ({self.slug})"


class Role(models.Model):
    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    description = models.CharField(blank=True, max_length=500)
    permissions = models.ManyToManyField(Permission, related_name="roles")

    def __str__(self) -> str:
        return self.display_name


class Staff(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    roles = models.ManyToManyField(Role, related_name="staff")
    phone_number = models.CharField(
        max_length=20, validators=[validate_phone_number], unique=True
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    description = models.CharField(blank=True, max_length=500)

    def __str__(self) -> str:
        roles = ", ".join(role.display_name for role in self.roles.all())
        return f"{self.first_name} {self.last_name} - [{roles}]"


class StaffContact(models.Model):
    class Method(models.TextChoices):
        TELEGRAM = "telegram", "Telegram"
        VK = "vk", "VK"  # Shall we write bots for these services?)
        MAX = "max", "Max"

    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="contacts")
    method = models.CharField(choices=Method)
    external_id = models.CharField(blank=True, max_length=100)
