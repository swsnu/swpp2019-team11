# Generated by Django 2.2.4 on 2019-11-18 14:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('surBing', '0005_auto_20191105_1900'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='survey',
            new_name='survey_completed',
        ),
        migrations.CreateModel(
            name='SurveyOngoing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('survey_start_date', models.CharField(max_length=10, null=True)),
                ('survey_end_date', models.CharField(max_length=10, null=True)),
                ('content', models.TextField(null=True)),
                ('respondant_count', models.IntegerField()),
                ('target_personnel', models.IntegerField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ongoing_author', to=settings.AUTH_USER_MODEL)),
                ('item', models.ManyToManyField(to='surBing.Item')),
            ],
        ),
        migrations.AddField(
            model_name='cart',
            name='survey_ongoing',
            field=models.ManyToManyField(to='surBing.SurveyOngoing'),
        ),
    ]