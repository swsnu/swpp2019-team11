from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class SurBingUser(AbstractUser):
    cart = models.ForeignKey('surBing.Cart', on_delete=models.PROTECT,
                             related_name='cart', blank=True, null=True)
<<<<<<< HEAD
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=1, blank=True, null=True)
    point = models.IntegerField(blank=True, null=True)
=======
    age = models.IntegerField()
    gender = models.CharField(max_length=1)
    point = models.IntegerField()
>>>>>>> bef878bd97f08c8276697c449142379d35adfe17
