# Стадия сборки
FROM node:23-slim AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts && npm cache clean --force

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]