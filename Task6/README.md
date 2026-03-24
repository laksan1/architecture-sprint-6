# 🧠 Задание 6. Настройка Rate Limiting

---

## 1. 📦 Ограничение количества отправляемых запросов <= 10 запросов в минуту c возвратом 429 ошибки

```js

limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/m;

http {
   # Настройка upstream для балансировки нагрузки
   upstream backend_servers {
       server backend1.example.com;
       server backend2.example.com;
       server backend3.example.com;
   }

   server {
       listen 80;

       location / {
           limit_req zone=mylimit;
           limit_req_status 429;
           proxy_pass http://backend_servers;
       }

   }
}

```
