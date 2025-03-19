# FortunaHub

Наш небольшой проект, который включает в себя сайт и телеграм бота для бани "Фортуна" в Зеленогорске.
Пользователи могут узнать о бане на сайте, там же забронировать посещение. Телеграм бот нужен для администраторов бани,
туда приходят оповещения о бронях, там можно создавать и просматривать их.

## Как начать работать с проектом ⭐️

### Требования
Для начала убедитесь, что у вас установлены следующие версии инструментов:

- **Python**: `3.12.6+`
- **Node.js**: `23.3.0+`
- **npm**: `10.9.0+`
- **PostgreSQL**: `16+`

### MAC / Linux

1. Клонируем репозиторий:

   ```bash
   # Если у вас настроен SSH
   git clone git@github.com:Eevandeya/FortunaHub.git
   
   # Если хотите использовать HTTPS
   git clone https://github.com/Eevandeya/FortunaHub.git
   
   cd FortunaHub
   ```

2. Создаем виртуальные окружения python для `backend` и `telegram-bot` и устанавливаем зависимости:

   ```bash
   # Backend
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   deactivate
   cd ..
   
   # Telegram bot
   cd telegram-bot
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   deactivate
   cd ..
   ```

3. Создаем `.env` файлы:

   ```bash
   cp backend/.env.example backend/.env
   cp telegram-bot/.env.example telegram-bot/.env
   ```

4. Заполняем `.env`:
    - Указываем конфигурацию `posgreSQL`.
    - Генерируем `DJANGO_SECRET_KEY` и вставляем его.
    - Вставляем `BOT_TOKEN`.

   Генерация `DJANGO_SECRET_KEY`:

   ```bash
   python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
   
5. Устанавливаем зависимости для фронтенда

   ```bash
   cd frontend
   npm install
   ```

### Windows

1. Клонируем репозиторий:

   ```powershell
   # Если у вас настроен SSH
   git clone git@github.com:Eevandeya/FortunaHub.git
   
   # Если хотите использовать HTTPS
   git clone https://github.com/Eevandeya/FortunaHub.git
   
   cd FortunaHub
   ```

2. Создаем виртуальные окружения python для `backend` и `telegram-bot` и устанавливаем зависимости:

   ```powershell
   # Backend
   cd backend
   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r requirements.txt
   deactivate
   cd ..
   
   # Telegram bot
   cd telegram-bot
   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r requirements.txt
   deactivate
   cd ..
   ```

3. Создаем `.env` файлы:

   ```powershell
   copy backend\.env.example backend\.env
   copy telegram-bot\.env.example telegram-bot\.env
   ```

4. Заполняем `.env`:
    - Указываем конфигурацию `posgreSQL`.
    - Генерируем `DJANGO_SECRET_KEY` и вставляем его.
    - Вставляем `BOT_TOKEN`.

   Генерация `DJANGO_SECRET_KEY`:

   ```powershell
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

5. Устанавливаем зависимости для фронтенда

   ```bash
   cd frontend
   npm install
   ```
   
**Можно работать!**

## Линтер перед коммитом 🔥

Можно использовать линтер `ruff` автоматически перед коммитом с помощью `pre-commit`.

Для этого нужно установить пакет `pre-commit` через `pip` **глобально**, не в виртуальное окружение:

```bash
pip install pre-commit
```

Далее нужно зайти в корневую директорию проекта и поставить `pre-commit` в проект:

```bash
pre-commit install
```

Теперь `ruff` будет запускаться перед коммитом и блокировать его, если код не пройдет проверку.

## Запуск 🚀
Сначала нужно проделать шаги по **началу работы с проектом**. Пока что можно запустить только все по отдельности.

### MAC / Linux
#### Backend

Сначала необходимо активировать виртуальное окружение.

```bash
source backend/.venv/bin/activate
python3 backend/manage.py runserver
```
#### Frontend

```bash
cd frontend
npm run dev
```

### Windows
#### Backend

Сначала необходимо активировать виртуальное окружение.

```powershell
.\backend\.venv\Scripts\activate
python backend\manage.py runserver
```
#### Frontend

```powershell
cd frontend
npm run dev
```