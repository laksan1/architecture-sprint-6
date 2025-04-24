# 🧠 Задание 2. Динамическое масштабирование контейнеров

---

## 1. 📈 Динамическая маршрутизация на основании показателей утилизации памяти

### 🚀 1. Поднимаем локальный кластер Kubernetes в Minikube

```bash
minikube start
```

### 🔧 2. Активируем метрики

```bash
minikube addons enable metrics-server
```

![Скриншот 1 и 2 пункта](./1/images/1,2.png)

### 📦 3. Развёртывание тестового приложения

```bash
kubectl apply -f deployment.yaml
```

### 🌐 4. Применяем Service

```bash
kubectl apply -f service.yaml
```

### 📊 5. Настраиваем Horizontal Pod Autoscaler (HPA)

```bash
kubectl apply -f hpa.yaml
```

### 🧩 6. Повторно активируем metrics-server (если нужно)

```bash
minikube addons enable metrics-server
```

### 📷 7. Скриншот проделанных шагов

![Скриншот 3,4,5,6,7 пункта](./1/images/3,4,5,6,7.png)

### ⚙️ 8. Проверка масштабируемости через Locust

```bash
locust

minikube dashboard
```

![Скриншот Статистики запросов в Locust](./1/images/locust_statistics.png)
![Скриншот Диаграмм в Locust](./1/images/locust_charts.png)
![Minikube Dashboard: нагрузка USERS: 1000 и RPS: 330](./1/images/minikube_dashboard.png)
![Deployment в Dashboard](./1/images/minikube_dashboard_deployment.png)
![Pods в Dashboard](./1/images/minikube_dashboard_pods.png)
![Высокая нагрузка: 9 подов](./1/images/minikube_dashboard_highload_9_pods.png)

### ✅ Вывод

- 🔁 HPA реагирует на нагрузку:
  - При утилизации памяти 62% держится 2 реплики.
  - При 126% — увеличивает до 4 реплик.
  - При снижении до ~65% — масштабирование останавливается.

📌 **HPA = автоматическое масштабирование подов по памяти.**

---

## 2. ⚡ Динамическая маршрутизация на основании количества запросов в секунду

### 🛠 1. Установка Helm-пакетов

_(Предполагается, что Helm уже установлен)_

### 📝 2–6. Создание конфигурационных файлов

- [deployment.yaml](./2/configs/deployment.yaml)
- [service.yaml](./2/configs/service.yaml)
- [servicemonitor.yaml](./2/configs/servicemonitor.yaml)
- [adapter-values.yaml](./2/configs/adapter-values.yaml)
- [hpa.yaml](./2/configs/hpa.yaml)

### 🔄 7. Приложение на Express для генерации метрик Prometheus

- [index.js](./2/configs/my-node-app/index.js)

### 📦 8. Сборка и загрузка Docker-образа в локальный Minikube

_(через `eval $(minikube docker-env)` и `docker build`)_

### 🧪 9. Проверка работы приложения

![Скриншот успешного ответа из контейнера](./2/images/curl_node_app.png)

### 🚀 10. Запуск всей конфигурации

_(kubectl apply -f ... для всех вышеуказанных файлов)_

### 📉 11. Метрики на `/metrics`

- Увеличение `http_requests_total` при каждом GET-запросе

![Скриншот метрик](./2/images/prometheus_metrics.png)

### 🎯 12. Проверка `/targets` в Prometheus

![Скриншот targets](./2/images/promethous_targets.png)

### 🧪 13. Нагрузка через Locust

![Скриншот статистики Locust](./2/images/locust.png)

### 📈 14. HPA масштабирует поды

![get hpa -w](./2/images/get_hpa_w.png)

### 📊 15. Проверка в Minikube Dashboard

![Minikube Pods](./2/images/minikube_dashboard_pods.png)

### 📈 16. Статистика в Prometheus

- Параметр `http_requests_total` = 121,000+

![Prometheus метрики](./2/images/prometheus_metrics_http_requests_total.png)

### 📺 17. Установка Grafana через Helm

![Скриншот запуска Grafana](./2/images/run_grafana.png)

### 📊 18. Dashboard Grafana по метрике `http_requests_total`

![Grafana Dashboard](./2/images/grafana_dashboard.png)

### 🧪 19. Увеличенная нагрузка → 7 подов

![Итоговый скриншот HPA по RPS](./2/images/grafana_result.png)

### ✅ Вывод

- 📊 Используя **пользовательские метрики Prometheus** (в частности, `http_requests_total`), мы реализовали масштабирование подов по количеству запросов в секунду.
- 🚀 Приложение масштабируется автоматически через HPA при увеличении RPS, достигая до **7 подов** при высокой нагрузке.
- 📡 Метрики успешно собираются через Prometheus Adapter и визуализируются в **Grafana**.
- ✅ Демонстрируется гибкость Kubernetes HPA в сочетании с кастомными метриками, позволяя адаптироваться под реальные сценарии нагрузки.
