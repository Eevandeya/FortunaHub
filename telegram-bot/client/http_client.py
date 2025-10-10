import httpx
import pydantic

from client.scemas import FreeSlotsResponse
from logger import get_logger

logger = get_logger(__name__)


class APIClient:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url

    async def get_free_slots(self, date_str: str) -> FreeSlotsResponse | None:
        async with httpx.AsyncClient(base_url=self.base_url) as client:
            response = await client.get("bookings/free-slots/", params={"date": date_str})
            try:
                response.raise_for_status()
            except httpx.HTTPStatusError as exc:
                logger.critical(
                    f"Error response {exc.response.status_code} while requesting {exc.request.url!r}."
                )
                return None

            try:
                data = response.json()
            except httpx.RequestError as exc:
                logger.critical(
                    f"An error occurred while requesting {exc.request.url!r}."
                )
                return None

            try:
                return FreeSlotsResponse(**data)
            except pydantic.ValidationError as exc:
                logger.critical(
                    f"An error occurred while validating response data: {exc}."
                    f"Response content: {data}"
                )
                return None
