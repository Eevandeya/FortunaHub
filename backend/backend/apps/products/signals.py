from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from backend.apps.products.models import Product


@receiver(post_delete, sender=Product)
def delete_image_on_delete(
    sender: type[Product], instance: Product, **kwargs: object
) -> None:
    if instance.image:
        instance.image.delete(save=False)


@receiver(pre_save, sender=Product)
def delete_old_file_on_change(
    sender: type[Product], instance: Product, **kwargs: object
) -> None:
    if not instance.pk:
        return
    try:
        old_file = sender.objects.get(pk=instance.pk).image
    except sender.DoesNotExist:
        return
    new_file = instance.image
    if new_file and old_file != new_file:
        old_file.delete(save=False)
