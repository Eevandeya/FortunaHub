class InsufficientStockError(Exception):
    def __init__(
        self, product_slug: str, needed_quantity: int, available_quantity: int
    ) -> None:
        # self.member_id = item_slug    TODO: remove from here later
        super().__init__(
            f"Insufficient stock for product '{product_slug}'. "
            f"Requested: {needed_quantity}, available: {available_quantity}."
        )
