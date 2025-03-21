from typing import Final
from urllib.parse import urlparse

from aiogram import Bot
from bot_instance import bot as bot_instance
from decouple import config
from fastapi import APIRouter, Depends

parsed_url = urlparse(config("BOT_API_URL"))
bot_api_router = APIRouter(prefix=parsed_url.path)
bot_depends: Final[Depends] = Depends(lambda: bot_instance)

@bot_api_router.post("/test")
async def send_notification(
    user_id: int,
    message: str,
    bot: Bot = bot_depends
) -> dict[str, str]:
    await bot.send_message(user_id, message)
    return {"status": "ok"}
