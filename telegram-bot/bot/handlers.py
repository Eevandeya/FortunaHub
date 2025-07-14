# If there will be too many handlers, we can split them into separate files.
# With the following approach, the structure will look like this (example):
#
# bot/
#   handlers/
#       start.py
#       booking.py
#       ...
#   instance.py

from aiogram import F, Router
from aiogram.types import Message
from client.http_client import FortunaAPIClient
from decouple import config

from bot.instance import bot

message_router = Router()
api_client = FortunaAPIClient(config("FORTUNA_API_URL"))


@message_router.message(F.text)
async def handle_message(message: Message) -> None:
    await api_client.save_message(
        user_id=message.from_user.id,
        text=message.text
    )
    await bot.send_message(message.chat.id, "Сообщение сохранено!")
