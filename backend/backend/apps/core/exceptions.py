from django.db import models


class MissingInitialDataError(Exception):
    def __init__(self, model: type[models.Model], missing_data: str) -> None:
        message = f"Missing initial data for {model.__name__}: {missing_data}"
        super().__init__(message)
