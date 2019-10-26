from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Survey(models.Model):
    title = models.CharField(max_length=120)
    author = models.ForeignKey(User, on_delete = models.CASCADE related_name = author)
    date = models.TextField()
    content = models.TextField()
    response_count = models.IntegerField()
    cart = models.ForeignKey(User, on_delete = models.CASCADE)

class Item(models.Model):
    title = models.CharField(max_length=120)
    response_count = models.IntegerField()
    question_type = models.CharField(max_length=10)
    most_three_response = models.BooleanField()
    survey = models.ForeignKey(Survey, on_delete = models.CASCADE, related_name=survey)

class Response(models.Model):
    item = models.ForeignKey(Item, on_delete = models.CASCADE, related_name=item)
    content = models.TextField()

class Cart(models.Model):
    survey = models.ManyToManyField(Survey)s