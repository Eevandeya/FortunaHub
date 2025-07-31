# Simular to handles.py we can split routers into files

from typing import Final
from urllib.parse import urlparse

from aiogram import Bot
from decouple import config
from fastapi import APIRouter, Depends

from bot.core import bot

parsed_url = urlparse(config("BOT_API_URL"))
bot_api_router = APIRouter(prefix=parsed_url.path)
bot_depends: Final[Depends] = Depends(lambda: bot)

@bot_api_router.post("/test")
async def send_notification(
    user_id: int,
    message: str,
    bot_instance: Bot = bot_depends
) -> dict[str, str]:
    await bot_instance.send_message(user_id, message)
    return {"status": "ok"}
