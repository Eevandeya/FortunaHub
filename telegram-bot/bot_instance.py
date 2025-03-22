from aiogram import Bot
from decouple import config

bot = Bot(token=config("BOT_TOKEN"))
