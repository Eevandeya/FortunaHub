class NotEnoughItemsInStockError(Exception):
    def __init__(
        self, item_slug: str, needed_quantity: int, available_quantity: int
    ) -> None:
        self.member_id = item_slug
        super().__init__(
            f"Not enough items in stock for item with slug={item_slug}."
            f"Items needed: {needed_quantity}, items available: {available_quantity}"
        )
