# Стадия сборки
FROM node:23-slim AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts && npm cache clean --force

COPY . .

VOLUME ["/app/node_modules"]

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]