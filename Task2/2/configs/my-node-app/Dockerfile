# Используем легкий Node.js образ
FROM node:alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только package.json
COPY package.json ./ 

# Устанавливаем только необходимые зависимости (если это необходимо)
RUN npm install --production

# Копируем остальные файлы приложения
COPY . .

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", "index.js"]
