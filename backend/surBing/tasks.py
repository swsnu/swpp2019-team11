from celery.schedules import crontab
import datetime
from celery import task

from .models import SurveyOngoing, Survey, Cart, SurBingUser, Item, Response, Selection

@task
def onGoing_to_complete():
    onGoingSurveys = SurveyOngoing.objects.all()
    today = datetime.date.today()
    for survey in onGoingSurveys:
        if (survey.open_date <= today):
            new_survey = Survey(
                title=survey.title,
                author=survey.author,
                upload_date=survey.upload_date,
                survey_start_date=survey.survey_start_date,
                survey_end_date=survey.survey_end_date,
                content=survey.content,
                target_age_start=survey.target_age_start,
                target_age_end=survey.target_age_end,
                target_gender=survey.target_gender,
                respondant_count=survey.respondant_count,
            )
            new_survey.save()
            for item in survey.item.all():
                for response in item.response.all():
                    response.respondant_number = None
                    response.save()
                new_survey.item.add(item)
            new_survey.save()
            survey.delete()