import datetime as dt
from dataclasses import dataclass
from decimal import ROUND_HALF_UP, Decimal

from backend.apps.bookings.models import Booking
from backend.apps.core.models import Pricing


@dataclass(frozen=True)
class BookingPrice:
    duration_hours: dt.timedelta
    base_price: Decimal
    items_price: Decimal
    total: Decimal


def _quantize_money(value: Decimal) -> Decimal:
    return value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def get_booking_price(booking: Booking) -> BookingPrice:
    """
    Returns a BookingPrice dataclass instance containing the calculated cost breakdown
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

    duration_hours_time_delta = booking.end_datetime - booking.start_datetime
    duration_hours_decimal = Decimal(duration_hours_time_delta.total_seconds()) / Decimal("3600")

    base_price = duration_hours_decimal * hourly_rent
    items_price = sum((
        Decimal(booking_item.quantity) * Decimal(booking_item.inventory_item.unit_price)
        for booking_item in booking.items
    ), start=Decimal("0"))

    return BookingPrice(
        duration_hours=duration_hours_time_delta,
        base_price=_quantize_money(base_price),
        items_price=_quantize_money(items_price),
        total=_quantize_money(base_price + items_price)
    )
