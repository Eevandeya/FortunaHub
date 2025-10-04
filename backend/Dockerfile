# backend/Dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1 \
    POETRY_HOME="/opt/poetry"

WORKDIR /app

# Устанавливаем системные зависимости (минимум)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential gcc libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# Устанавливаем poetry (локально в /opt/poetry) и добавляем в PATH
RUN curl -sSL https://install.python-poetry.org | python - && \
    ln -s /opt/poetry/bin/poetry /usr/local/bin/poetry

# Копируем только метаданные зависимостей (кэшируем слой)
COPY pyproject.toml poetry.lock* /app/

# Устанавливаем зависимости (без dev)
RUN poetry install --no-interaction --no-ansi

# Копируем исходники приложения
COPY ./ /app/

EXPOSE 8000

# Простой CMD — для разработки: django runserver
# В продакшне замените на gunicorn/uvicorn через entrypoint
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]