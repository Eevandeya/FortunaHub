from aiogram import F, Router
from aiogram.types import Message
from backend_api import DjangoAPIClient
from bot_instance import bot
from decouple import config

message_router = Router()
api_client = DjangoAPIClient(config("DJANGO_API_URL"))


@message_router.message(F.text)
async def handle_message(message: Message) -> None:
    await api_client.save_message(
        user_id=message.from_user.id,
        text=message.text
    )
    await bot.send_message(message.chat.id, "Сообщение сохранено!")
