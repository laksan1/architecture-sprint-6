# Задание 2. Динамическое масштабирование контейнеров

### 1. Динамическая маршрутизация на основании показателей утилизации памяти

1.  Поднимаем локальный кластер Kubernetes в Minikube

```bash
minikube start
```

2. Активируем метрики

```bash
minikube addons enable metrics-server
```

![Скриншот 1 и 2 пункта](./1/images/1,2.png)

3. Делаем развертывание (Deployment) Kubernetes для запуска тестового приложения

```bash
kubectl apply -f deployment.yaml
```

4. Применяем манифест Service

```bash
kubectl apply -f service.yaml
```

5. Настраиваем динамическую маршрутизацию на основании показателей утилизации оперативной памяти с помощью Horizontal Pod Autoscaler (HPA).

```bash
kubectl apply -f hpa.yaml
```

6. Активируем поддержку метрик в нашем кластере

```bash
minikube addons enable metrics-server
```

7. Сделал в 5 пункте

   ![Скриншот 3,4,5,6,7 пункта](./1/images/3,4,5,6,7.png)

8. Проверка масштабируемости подов через нагрузку Locust

```bash
locust

minikube dashboard
```

Скриншот Статистики запросов в Locust
![Скриншот Статистики запросов в Locust](./1/images/locust_statistics.png)

Скриншот Диаграмм в Locust
![Скриншот Статистики запросов в Locust](./1/images/locust_charts.png)

Скриншот Dashboard для нагрузки USERS: 1000 и RPS: 330
Видим, что количество подов выросло до 4 подов
![Скриншот Статистики запросов в Locust](./1/images/minikube_dashboard.png)

Скриншот раздела Deployment в Dashboard
![Скриншот Статистики запросов в Locust](./1/images/minikube_dashboard_deployment.png)

Скриншот раздела Pods в Dashboard
![Скриншот Статистики запросов в Locust](./1/images/minikube_dashboard_pods.png)

Скриншот раздела Pods в Dashboard при увеличенной нагрузке.
В конце Timeline графиков виден скачок CPU и Memory.
Поды автоматически увеличились до 9
![Скриншот Статистики запросов в Locust](./1/images/minikube_dashboard_highload_9_pods.png)

**Вывод**

🔁 HPA реагирует на нагрузку
Сначала нагрузка по памяти была 62% — HPA держал 2 реплики.

Потом утилизация выросла до 126% — HPA увеличил количество реплик до 4, чтобы справиться с нагрузкой.

Далее утилизация стабилизировалась на уровне 65–66% — ниже порога 80%, поэтому новых подов не создаётся.

## 📌 HPA = автоматическое масштабирование подов по памяти.

### 2. Динамическая маршрутизация на основании показателей количества запросов в секунду
