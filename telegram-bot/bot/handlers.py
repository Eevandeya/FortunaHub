# If there will be too many handlers, we can split them into separate files.
# With the following approach, the structure will look like this (example):
#
# bot/
#   handlers/
#       start.py
#       booking.py
#       ...
#   core.py
from datetime import datetime

from aiogram.filters import Command
from aiogram.types import Message
from client.http_client import APIClient
from decouple import config

from bot.core import dp


@dp.message(Command("free_slots"))
async def command_free_handler(message: Message) -> None:
    args = message.text.removeprefix("/free_slots").strip().split()
    if not args:
        await message.answer("Date required")
        return

    if len(args) > 1:
        await message.answer("Too many arguments")
        return

    date_str = args[0]

    try:
        datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        await message.answer("Invalid date")
        return

    client = APIClient(config("FORTUNA_API_URL"), config("BACKEND_API_SECRET_KEY"))
    response = await client.get_free_slots(date_str)

    if response is None:
        await message.answer("Internal error")
        return

    s = ""
    for slot in response.free_slots:
        s += f"{slot.start.strftime("%H:%M")} - {slot.end.strftime("%H:%M")}\n"

    await message.answer(s)
