from django.db import models


class Permission(models.Model):
    display_name = models.CharField(max_length=100)
    code = models.SlugField(unique=True, max_length=50)
    description = models.CharField(blank=True, null=True, max_length=500)

    def __str__(self) -> str:
        return f"{self.display_name} ({self.code})"
