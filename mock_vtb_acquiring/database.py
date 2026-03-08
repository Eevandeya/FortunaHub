from json import dump, load
from os.path import exists as path_exists
from pathlib import Path


class PaymentDB:
    def __init__(self, file_name: str = "payment_db.json") -> None:
        self.file_name = (
            file_name if file_name.endswith(".json") else f"{file_name}.json"
        )
        self._db_path = Path(__file__).parent / self.file_name
        self._data = self.load_data()

    def load_data(self) -> dict:
        if not path_exists(self._db_path):
            return {}
        with open(self._db_path) as file:
            return load(file)

    def commit(self) -> None:
        with open(self._db_path, "w") as file:
            dump(self._data, file, indent=4)

    def save_order(self, order_id: str, **order_data: str | int) -> None:
        self._data[order_id] = order_data

    def get_order(self, order_id: str) -> dict:
        return self._data.get(order_id, {})

    def __enter__(self) -> "PaymentDB":
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:  # noqa: ANN001
        self.commit()

    def __str__(self) -> str:
        return f"<PaymentDB: file_name={self.file_name}, db_path={self._db_path}>"
