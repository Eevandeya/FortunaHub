from django.db import transaction

from backend.apps.bookings.models import Booking
from backend.apps.inventory.exceptions import NotEnoughItemsInStockError
from backend.apps.inventory.models import BookingItem, InventoryItem


@transaction.atomic
def add_item_to_booking(
    booking: Booking, quantity: int, item_obj: InventoryItem
) -> (BookingItem, InventoryItem):
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero.")

    if not item_obj.is_available(quantity):
        raise NotEnoughItemsInStockError(item_obj.slug, quantity, item_obj.quantity)

    if item_obj.item_type == InventoryItem.ItemType.CONSUMABLE:
        item_obj.quantity -= quantity
        item_obj.save(update_fields=["quantity"])

    booking_item = BookingItem.objects.create(
        booking=booking,
        inventory_item=item_obj,
        quantity=quantity,
    )

    return booking_item, item_obj
