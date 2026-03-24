from locust import HttpUser, task, between

class NodeMetricsAppUser(HttpUser):
    wait_time = between(1, 5)  # Время ожидания между запросами (1-5 секунд)

    @task
    def load_test(self):
        self.client.get("/")  # Тестируем путь /metrics, куда Prometheus собирает метрики
