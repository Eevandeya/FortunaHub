from django.db import models

from backend.apps.customers.validators import validate_phone_number


class Customer(models.Model):
    nickname = models.CharField(max_length=50)
    phone_number = models.CharField(
        max_length=20, validators=[validate_phone_number], unique=True
    )
    last_visit_date = models.DateField()
    number_of_visits = models.PositiveSmallIntegerField()

    def __str__(self) -> str:
        return self.nickname
