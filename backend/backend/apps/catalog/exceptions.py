from django.db.models import Model


class InsufficientStockError(Exception):
    def __init__(
        self, product_slug: str, needed_quantity: int, available_quantity: int
    ) -> None:
        super().__init__(
            f"Insufficient stock for product '{product_slug}'. "
            f"Requested: {needed_quantity}, available: {available_quantity}."
        )


class MissingInitialDataError(Exception):
    def __init__(self, model: type[Model], missing_data: str) -> None:
        message = f"Missing initial data for {model.__name__}: {missing_data}"
        super().__init__(message)
