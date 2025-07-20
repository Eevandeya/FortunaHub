# If there will be too many handlers, we can split them into separate files.
# With the following approach, the structure will look like this (example):
#
# bot/
#   handlers/
#       start.py
#       booking.py
#       ...
#   core.py

from aiogram import Router
from client.http_client import APIClient
from decouple import config

message_router = Router()
api_client = APIClient(config("FORTUNA_API_URL"))

# @message_router.message(F.text)
# async def handle_message(message: Message) -> None:
#     await api_client.save_message(
#         user_id=message.from_user.id,
#         text=message.text
#     )
#     await bot.send_message(message.chat.id, "Сообщение сохранено!")
