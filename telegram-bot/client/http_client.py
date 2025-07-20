import httpx
import pydantic
from logger import get_logger
from scemas import FreeSlotsResponse

logger = get_logger(__name__)

class APIClient:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url

    async def get_free_slots(self, date_str: str) -> FreeSlotsResponse | None:
        async with httpx.AsyncClient(base_url=self.base_url) as client:
            response = await client.get("/free_slots", params={"date": date_str})
            try:
                response.raise_for_status()
                data = response.json()
                return FreeSlotsResponse(**data)

            except httpx.RequestError as exc:
                logger.critical(f"An error occurred while requesting {exc.request.url!r}.")

            except pydantic.ValidationError as exc:
                logger.critical(f"An error occurred while validating response data: {exc}.")

            except httpx.HTTPStatusError as exc:
                logger.critical(f"Error response {exc.response.status_code} while requesting {exc.request.url!r}.")
