# FortunaHub

Наш небольшой проект, который включает в себя сайт и телеграм бота для бани "Фортуна" в Зеленогорске.
Пользователи могут узнать о бане на сайте, там же забронировать посещение. Телеграм бот нужен для администраторов бани,
туда приходят оповещения о бронях, там можно создавать и просматривать их.

## Как начать

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
   copy backend/.env.example backend/.env
   copy telegram-bot/.env.example telegram-bot/.env
   ```

4. Заполняем `.env`:
    - Указываем конфигурацию `posgreSQL`.
    - Генерируем `DJANGO_SECRET_KEY` и вставляем его.
    - Вставляем `BOT_TOKEN`.

   Генерация `DJANGO_SECRET_KEY`:

   ```powershell
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```


**Можно работать!** 🚀

## Линтер перед коммитом

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

## Настройка React приложения

### 1. Установка Node.js
Перед началом работы убедись, что у тебя установлены Node.js и npm (Node Package Manager). Проверь их версии: 
```bash
   node -v
   npm -v
```
Если Node.js и npm не установлены, скачай их с [официального сайта](https://nodejs.org/en)

### 2. Создание проекта через Vite

Чтобы создать **React + Vite** приложение выполни эти команды:

#### Шаг.1: Запустите команду создания проекта

```bash
   cd frontend/my_react
   npm create vite@latest
```
#### Шаг.2: Выберите настройки проекта
1. Введите имя вашего проекта (например, fortuna_react).

2. Выберите ___React___.

3. Выберите JavaScript + SWC.

#### Шаг.3: Выполните указания в консоли

```bash
   cd fortuna_react
   npm install
   npm run dev
```
### Шаг.4: Файл eslint.config.js
Если что, файл __eslint.config.js__ у меня выглядит так:
```
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
       'prettier' : eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
    },
  },
];

```
### P.S
***JavaScript + SWC*** — это современный подход к разработке JavaScript-приложений, где SWC (Speedy Web Compiler) используется как высокопроизводительный компилятор и инструмент для транспиляции и оптимизации кода. SWC написан на Rust и работает значительно быстрее, чем Babel, что делает его отличным выбором для сборки и оптимизации JavaScript- и TypeScript-проектов.
