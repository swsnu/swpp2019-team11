from django.db import models
from users.models import SurBingUser

# Create your models here.
class Survey(models.Model): #completed survey
    title = models.CharField(max_length=120)
    author = models.ForeignKey(SurBingUser, on_delete=models.CASCADE, related_name='author')
    upload_date = models.CharField(max_length=10, null=True)
    survey_start_date = models.CharField(max_length=10, null=True)
    survey_end_date = models.CharField(max_length=10, null=True)
    content = models.TextField(null=True)
    respondant_count = models.IntegerField()
    item = models.ManyToManyField('Item')

class SurveyOngoing(models.Model):  #not completed survey
    title = models.CharField(max_length=120)
    author = models.ForeignKey(SurBingUser, on_delete=models.CASCADE, related_name='ongoing_author')
    survey_start_date = models.CharField(max_length=10, null=True)
    survey_end_date = models.CharField(max_length=10, null=True)
    content = models.TextField(null=True)
    respondant_count = models.IntegerField()
    target_respondant_count = models.IntegerField()
    target_age_start = models.IntegerField()
    target_age_end = models.IntegerField()
    target_gender = models.CharField(max_length = 5)
    item = models.ManyToManyField('Item')

class Item(models.Model):
    title = models.CharField(max_length=120)
    question_type = models.CharField(max_length=10, null=True)
    selection = models.ManyToManyField('Selection')
    response = models.ManyToManyField('Response')

class Selection(models.Model):
    title = models.CharField(max_length=120)
    index = models.IntegerField()

class Response(models.Model):
    respondant_number = models.IntegerField(null=True)
    content = models.TextField()

class Cart(models.Model):
    survey = models.ManyToManyField('Survey')
