from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(3, 6)

    @task(5)
    def taskfrontend(self):
        self.client.get("/")

    @task(3)
    def api(self):
        self.client.get(":85/declare")

    @task(1)
    def bacon(self):
        self.client.get(":85/bacon/3")
