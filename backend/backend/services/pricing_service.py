import datetime as dt
from dataclasses import dataclass
from decimal import ROUND_HALF_UP, Decimal
from typing import Any

from backend.apps.core.models import Pricing
from backend.apps.inventory.models import InventoryItem


@dataclass(frozen=True)
class BookingPricingResult:
    duration: dt.timedelta
    base_price: Decimal
    items_price: Decimal
    total: Decimal


@dataclass(frozen=True)
class BookingItemInput:
    item: InventoryItem
    quantity: int


def _quantize_money(value: Decimal) -> Decimal:
    return value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def build_booking_items(raw_items: list[dict[str, Any]]) -> list[BookingItemInput]:
    return [
        BookingItemInput(
            item=InventoryItem.objects.get(slug=entry["slug"]),
            quantity=entry["quantity"],
        )
        for entry in raw_items
    ]


def get_booking_price(
    start_datetime: dt.datetime,
    end_datetime: dt.datetime,
    booking_items: list[BookingItemInput],
) -> BookingPricingResult:
    """
    Returns a BookingPricingResult dataclass instance containing the calculated cost breakdown
    for a given booking.

    Calculation rules:
      1. Base price is calculated as the total duration in hours multiplied
         by the current hourly rent rate from Pricing.
      2. Item price is the sum of (quantity × unit price) for each inventory item
         included in the booking.
      3. All monetary values are rounded to 2 decimal places using ROUND_HALF_UP
         to ensure financial accuracy.
    """
    hourly_rent, _ = Pricing.get_hourly_rent_and_prepayment()

    duration_time_delta = end_datetime - start_datetime
    if duration_time_delta <= dt.timedelta(0):
        raise ValueError("End datetime must be greater than start datetime.")

    duration_hours_decimal = Decimal(duration_time_delta.total_seconds()) / Decimal(
        "3600"
    )

    base_price = duration_hours_decimal * hourly_rent
    items_price = sum(
        (
            Decimal(booking_item.quantity) * Decimal(booking_item.item.unit_price)
            for booking_item in booking_items
        ),
        start=Decimal("0"),
    )

    return BookingPricingResult(
        duration=duration_time_delta,
        base_price=_quantize_money(base_price),
        items_price=_quantize_money(items_price),
        total=_quantize_money(base_price + items_price),
    )
