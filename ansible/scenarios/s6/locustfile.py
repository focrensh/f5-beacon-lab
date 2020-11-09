from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(3, 6)

    @task(1)
    def bacon(self):
        self.client.get("/bacon/1", verify=False)
