from locust import HttpLocust, TaskSet, task

class LoadTask(TaskSet):
    def on_start(self):
        self.csrftoken = self.client.get('/api/token/').cookies['csrftoken']

    def on_stop(self):
        pass

    @task
    def index_page(self):
        self.client.post('/api/login/', {
            "username'" : "jangsus1",
            "password" : "icecloud10"
        }, headers={"X-CSRFToken" : self.csrftoken})

class WebsiteUser(HttpLocust):
    task_set = LoadTask
    min_wait = 3000
    max_wait = 8000
