from aiogram import Bot, Dispatcher
from decouple import config

bot = Bot(token=config("BOT_TOKEN"))
dp = Dispatcher()

