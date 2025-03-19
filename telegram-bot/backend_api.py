#import httpx


class DjangoAPIClient:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url

    async def save_message(self, user_id: int, text: str) -> None:
        pass
        # async with httpx.AsyncClient() as client:
        #     await client.post(
        #         f"{self.base_url}/api/messages/",
        #         json={"user_id": user_id, "text": text}
        #     )
