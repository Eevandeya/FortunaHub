from backend.apps.bookings.models import Booking
from backend.apps.inventory.exceptions import NotEnoughItemsInStockError
from backend.apps.inventory.models import BookingItem, InventoryItem


def is_inventory_item_available(quantity: int, item_obj: InventoryItem) -> bool:
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero.")

    return item_obj.quantity >= quantity


def add_item_to_booking(
    booking: Booking, quantity: int, item_obj: InventoryItem
) -> (BookingItem, InventoryItem):
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero.")

    if item_obj.quantity < quantity:
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
