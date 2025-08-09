from typing import Any

from django.core.cache import cache
from django.db import transaction
from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver

from backend.apps.core.models import Pricing, SaunaConfig

# --- Pricing ----------------------------------------------------

PRICING_KEYS = {"hourly_rent", "prepayment"}


def _pricing_key(name: str) -> str:
    return f"pricing:{name}"


@receiver(pre_save, sender=Pricing)
def pricing_pre_save(
    sender: Pricing, instance: Pricing, **_kwargs: dict[str, Any]
) -> None:
    if instance.pk:
        old_name = (
            sender.objects.filter(pk=instance.pk).values_list("name", flat=True).first()
        )
        if old_name and old_name != instance.name and old_name in PRICING_KEYS:
            transaction.on_commit(lambda: cache.delete(_pricing_key(old_name)))


@receiver(post_save, sender=Pricing)
def pricing_post_save(
    _sender: Pricing, instance: Pricing, **_kwargs: dict[str, Any]
) -> None:
    if instance.name in PRICING_KEYS:
        transaction.on_commit(lambda: cache.set(_pricing_key(instance.name), instance))


@receiver(post_delete, sender=Pricing)
def pricing_post_delete(
    _sender: Pricing, instance: Pricing, **_kwargs: dict[str, Any]
) -> None:
    if instance.name in PRICING_KEYS:
        transaction.on_commit(lambda: cache.delete(_pricing_key(instance.name)))


# --- SaunaConfig ----------------------------------------------------

SAUNA_KEY = "sauna_config"


def _refresh_sauna_cache() -> None:
    latest = SaunaConfig.objects.order_by("-created").first()
    if latest is None:
        cache.delete(SAUNA_KEY)
    else:
        cache.set(SAUNA_KEY, latest)


@receiver(post_save, sender=SaunaConfig)
def sauna_post_save(
    _sender: SaunaConfig, _instance: SaunaConfig, **_kwargs: dict[str, Any]
) -> None:
    transaction.on_commit(_refresh_sauna_cache)


@receiver(post_delete, sender=SaunaConfig)
def sauna_post_delete(
    _sender: SaunaConfig, _instance: SaunaConfig, **_kwargs: dict[str, Any]
) -> None:
    transaction.on_commit(_refresh_sauna_cache)
