# FortunaHub

## Начало работы

Сначала склонировать репозиторий:
```bash
git clone ...
cd FortunaHub
```
Далее создать виртуальные оркружения (`python venv`) **отдельно** для `/backend` и `/telegram-bot`.

Установить зависимости с помощью `pip` для `/backend` и `/telegram-bot` по отдельности:
```bash
pip install -r requirements.txt
```

Далее нужно создать файлы окружения `backend/.env` и `telegram-bot/.env`
по шаблонам `backend/.env.example` и `telegram-bot/.env.example` соответственно.

**Можно работать!**

### Линтер перед коммитом (`pre-commit`)

Мы используем линтер `ruff` автоматически перед коммитом.

Для этого нужно установить пакет `pre-commit` на систему через `pip` **глобально**, не в виртуальное окружение:
```bash
pip install pre-commit
```

Далее нужно зайти в коневую директорию проекта `/FortunaHub` и поставить `pre-commit` в проект:
```bash
pre-commit install
```

Теперь `ruff` будет запускаться перед коммитом и блокировать его, если код не пройдет проверку.