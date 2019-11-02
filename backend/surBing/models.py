from django.db import models
from users.models import SurBingUser

# Create your models here.
class Survey(models.Model):
    title = models.CharField(max_length=120)
    author = models.ForeignKey(SurBingUser, on_delete=models.CASCADE, related_name='author')
    date = models.TextField()
    content = models.TextField()
    response_count = models.IntegerField()
    item = models.ManyToManyField('Item')

class Item(models.Model):
    title = models.CharField(max_length=120)
    response_count = models.IntegerField()
    question_type = models.CharField(max_length=10)
    most_three_response = models.BooleanField()
    response = models.ManyToManyField('Response')

class Response(models.Model):
    content = models.TextField()

class Cart(models.Model):
    survey = models.ManyToManyField('Survey')
