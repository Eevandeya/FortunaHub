class MissingInitialDataError(Exception):
    def __init__(self, hint_fixture: str | None = None) -> None:
        message = "Required initial data is missing in the database."
        if hint_fixture:
            message += (
                f"\nYou can load it by running:\n"
                f"    python manage.py loaddata {hint_fixture}"
            )
        super().__init__(message)
