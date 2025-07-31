import asyncio
from urllib.parse import urlparse

import uvicorn
from decouple import config
from fastapi import FastAPI

from api.routers import bot_api_router

# Register handlers. Temporary solution
from bot import handlers  # noqa: F401
from bot.start import start_bot
from logger import get_logger

logger = get_logger(__name__)

app = FastAPI()
app.include_router(bot_api_router)

async def start() -> None:
    bot_task = asyncio.create_task(start_bot())

    logger.info("Aiogram bot polling started")

    parsed_url = urlparse(config("BOT_API_URL"))
    uvicorn_config = uvicorn.Config(app=app, host=parsed_url.hostname, port=parsed_url.port, loop="asyncio")
    server = uvicorn.Server(uvicorn_config)
    api_task = asyncio.create_task(server.serve())

    logger.info("FastAPI server initialized")

    logger.info("Starting bot and FastAPI server")

    await asyncio.gather(bot_task, api_task)

if __name__ == "__main__":
    try:
        asyncio.run(start())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Bot and FastAPI server stopped")
