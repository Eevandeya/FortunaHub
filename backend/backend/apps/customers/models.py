from django.db import models


class Customer(models.Model):
    nickname = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    last_visit_date = models.DateField()
    number_of_visits = models.PositiveSmallIntegerField()
