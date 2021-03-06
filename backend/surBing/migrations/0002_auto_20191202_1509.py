# Generated by Django 2.2.6 on 2019-12-02 06:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('surBing', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='surveyongoing',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ongoing_author', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='surveyongoing',
            name='item',
            field=models.ManyToManyField(to='surBing.Item'),
        ),
        migrations.AddField(
            model_name='surveyongoing',
            name='respondant',
            field=models.ManyToManyField(related_name='participated_surveys', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='survey',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='survey',
            name='item',
            field=models.ManyToManyField(to='surBing.Item'),
        ),
        migrations.AddField(
            model_name='item',
            name='response',
            field=models.ManyToManyField(to='surBing.Response'),
        ),
        migrations.AddField(
            model_name='item',
            name='selection',
            field=models.ManyToManyField(blank=True, to='surBing.Selection'),
        ),
        migrations.AddField(
            model_name='cart',
            name='survey',
            field=models.ManyToManyField(to='surBing.Survey'),
        ),
    ]
