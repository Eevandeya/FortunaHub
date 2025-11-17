from django.db import models


class Role(models.Model):
    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    description = models.CharField(blank=True, null=True, max_length=500)
    permissions = models.ManyToManyField("Permission", related_name="roles", blank=True)

    def __str__(self) -> str:
        return self.display_name


class Permission(models.Model):
    display_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=50)
    description = models.CharField(blank=True, null=True, max_length=500)

    def __str__(self) -> str:
        return f"{self.display_name} ({self.slug})"
