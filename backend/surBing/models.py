from django.db import models

from users.models import SurBingUser


# Create your models here.
class Survey(models.Model):  # completed survey
    title = models.CharField(max_length=120)
    author = models.ForeignKey(SurBingUser, on_delete=models.CASCADE, related_name='author')
    upload_date = models.DateField()
    survey_start_date = models.DateField()
    survey_end_date = models.DateField()
    content = models.TextField(null=True)
    target_age_start = models.IntegerField()
    target_age_end = models.IntegerField()
    target_gender = models.CharField(max_length=1)
    respondant_count = models.IntegerField()
    item = models.ManyToManyField('Item')
    related_survey1 = models.ForeignKey('Survey', on_delete=models.PROTECT,
                                        related_name='pointed_mostly_related',
                                        null=True, blank=True)
    related_survey2 = models.ForeignKey('Survey', on_delete=models.PROTECT,
                                        related_name='pointed_secondly_related',
                                        null=True, blank=True)
    similarity1 = models.IntegerField(default=0)
    similarity2 = models.IntegerField(default=0)


class SurveyOngoing(models.Model):
    title = models.CharField(max_length=120)
    author = models.ForeignKey(SurBingUser, on_delete=models.CASCADE, related_name='ongoing_author')
    upload_date = models.DateField(auto_now_add=True)
    survey_start_date = models.DateField()
    survey_end_date = models.DateField()
    open_date = models.DateField()
    content = models.TextField(null=True)
    respondant_count = models.IntegerField()
    target_respondant_count = models.IntegerField()
    target_age_start = models.IntegerField()
    target_age_end = models.IntegerField()
    target_gender = models.CharField(max_length=5)
    item = models.ManyToManyField('Item')
    respondant = models.ManyToManyField(SurBingUser, related_name='participated_surveys')


class Item(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length=120)
    question_type = models.CharField(max_length=10, null=True)
    selection = models.ManyToManyField('Selection', blank=True)
    multiple_choice = models.BooleanField(null=True)
    personal_data = models.BooleanField(null=True)
    response = models.ManyToManyField('Response')


class Selection(models.Model):
    number = models.IntegerField()
    content = models.CharField(max_length=120)


class Response(models.Model):
    respondant_number = models.IntegerField(null=True)
    content = models.TextField()


class Cart(models.Model):
    survey = models.ManyToManyField('Survey')
