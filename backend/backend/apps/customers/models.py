from django.db import models

from backend.validators.django_validators import validate_phone_number


class Customer(models.Model):
    nickname = models.CharField(max_length=50)
    phone_number = models.CharField(
        max_length=20, validators=[validate_phone_number], unique=True
    )
    last_visit_date = models.DateField()
    number_of_visits = models.PositiveSmallIntegerField()

    def __str__(self) -> str:
        return self.nickname


class CustomerContact(models.Model):
    class Method(models.TextChoices):
        TELEGRAM = "telegram", "Telegram"
        VK = "vk", "VK"  # Shall we write bots for these services?)
        MAX = "max", "Max"

    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="contacts"
    )
    method = models.CharField(choices=Method)
    external_id = models.CharField(blank=True, max_length=100)
