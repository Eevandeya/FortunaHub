import asyncio
from urllib.parse import urlparse

import uvicorn
from aiogram import Dispatcher
from api.routers import bot_api_router
from bot.instance import bot
from decouple import config
from fastapi import FastAPI

app = FastAPI()
app.include_router(bot_api_router)

async def start() -> None:
    dp = Dispatcher()
    bot_task = asyncio.create_task(dp.start_polling(bot))

    parsed_url = urlparse(config("BOT_API_URL"))
    uvicorn_config = uvicorn.Config(app=app, host=parsed_url.hostname, port=parsed_url.port, loop="asyncio")

    server = uvicorn.Server(uvicorn_config)
    api_task = asyncio.create_task(server.serve())

    await asyncio.gather(bot_task, api_task)

if __name__ == "__main__":
    asyncio.run(start())
