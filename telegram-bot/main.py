import asyncio
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from aiogram import Dispatcher
from bot_api import bot_api_router
from bot_instance import bot
from fastapi import FastAPI
from handlers import message_router


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None, None]:
    dp = Dispatcher()
    dp.include_router(message_router)
    polling_task = asyncio.create_task(dp.start_polling(bot))
    yield
    await dp.stop_polling()  # Явная остановка
    await polling_task  # Дождаться завершения
    await bot.session.close()


app = FastAPI(lifespan=lifespan)
app.include_router(bot_api_router)


if __name__ == "__main__":
    from urllib.parse import urlparse

    import uvicorn
    from decouple import config

    parsed_url = urlparse(config("BOT_API_URL"))
    uvicorn.run(app, host=parsed_url.hostname, port=parsed_url.port)
