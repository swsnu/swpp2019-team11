from django.db import models
from users.models import SurBingUser

# Create your models here.
class Survey(models.Model):
    title = models.CharField(max_length=120)
    author = models.ForeignKey(SurBingUser, on_delete=models.CASCADE, related_name='author')
    upload_date = models.CharField(max_length=10)
    survey_start_date = models.CharField(max_length=10)
    survey_end_date = models.CharField(max_length=10)
    content = models.TextField()
    respondant_count = models.IntegerField()
    item = models.ManyToManyField('Item')

class Item(models.Model):
    title = models.CharField(max_length=120)
    question_type = models.CharField(max_length=10)
    response = models.ManyToManyField('Response')

class Response(models.Model):
    respondant_id = models.IntegerField()
    content = models.TextField()

class Cart(models.Model):
    survey = models.ManyToManyField('Survey')