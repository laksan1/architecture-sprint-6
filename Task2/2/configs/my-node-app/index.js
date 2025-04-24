const express = require('express');
const promClient = require('prom-client');
const app = express();
const port = 8080;

// Получаем имя пода из переменной окружения
const podName = process.env.POD_NAME || 'unknown';

// Создаём счётчик запросов
const httpRequests = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['path', 'pod']  
});

// Основной маршрут
app.get('/', (req, res) => {
  httpRequests.inc({ path: req.path, pod: podName });  инкрементируем с pod
  res.send(`Hello, World! ${new Date().toISOString()}`);
});

// Метрики
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
