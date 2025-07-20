from logger import get_logger

from bot.core import bot, dp

logger = get_logger(__name__)

async def start_bot() -> None:
    logger.info("Aiogram polling starting...")
    await dp.start_polling(bot)
