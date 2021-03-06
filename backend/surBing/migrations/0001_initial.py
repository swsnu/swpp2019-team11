# Generated by Django 2.2.6 on 2019-12-02 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('title', models.CharField(max_length=120)),
                ('question_type', models.CharField(max_length=10, null=True)),
                ('multiple_choice', models.BooleanField(null=True)),
                ('personal_data', models.BooleanField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Response',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('respondant_number', models.IntegerField(null=True)),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Selection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('content', models.CharField(max_length=120)),
            ],
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('upload_date', models.DateField()),
                ('survey_start_date', models.DateField()),
                ('survey_end_date', models.DateField()),
                ('content', models.TextField(null=True)),
                ('target_age_start', models.IntegerField()),
                ('target_age_end', models.IntegerField()),
                ('target_gender', models.CharField(max_length=1)),
                ('respondant_count', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SurveyOngoing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('upload_date', models.DateField(auto_now_add=True)),
                ('survey_start_date', models.DateField()),
                ('survey_end_date', models.DateField()),
                ('open_date', models.DateField()),
                ('content', models.TextField(null=True)),
                ('respondant_count', models.IntegerField()),
                ('target_respondant_count', models.IntegerField()),
                ('target_age_start', models.IntegerField()),
                ('target_age_end', models.IntegerField()),
                ('target_gender', models.CharField(max_length=5)),
            ],
        ),
    ]
