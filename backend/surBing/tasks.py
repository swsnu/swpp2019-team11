import json
import datetime
import requests
from celery import task


from .models import SurveyOngoing, Survey

url = "https://twinword-text-similarity-v1.p.rapidapi.com/similarity/"
headers = {
    'x-rapidapi-host': "twinword-text-similarity-v1.p.rapidapi.com",
    'x-rapidapi-key': "3fb70e8c2dmshbe50fa569abecd0p192041jsn75262be6de58"
}


@task
def onGoing_to_complete():
    onGoingSurveys = SurveyOngoing.objects.all()
    today = datetime.date.today()
    survey_delete_list = []

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
                similarity1=0,
                similarity2=0
            )
            new_survey.save()

            for item in survey.item.all():
                if(not item.personal_data):
                    for response in item.response.all():
                        response.respondant_number = None
                        response.save()
                    new_survey.item.add(item)
            new_survey.save()
            survey_delete_list.append(survey.id)

            for completed_survey in Survey.objects.all():
                if new_survey.id == completed_survey.id:
                    continue
                querystring = {
                    "text1": completed_survey.title,
                    "text2": new_survey.title
                }
                response = requests.request("GET", url, headers=headers, params=querystring)
                similarity = json.loads(response.text)['similarity']

                if (completed_survey.similarity1 < similarity):
                    completed_survey.related_survey2 = completed_survey.related_survey1
                    completed_survey.similarity2 = completed_survey.similarity1
                    completed_survey.related_survey1 = new_survey
                    completed_survey.similarity1 = similarity
                    completed_survey.save()
                elif (completed_survey.similarity1 >= similarity > completed_survey.similarity2):
                    completed_survey.related_survey2 = new_survey
                    completed_survey.similarity2 = similarity
                    completed_survey.save()

                if (new_survey.similarity1 < similarity):
                    new_survey.related_survey2 = new_survey.related_survey1
                    new_survey.similarity2 = new_survey.similarity1
                    new_survey.related_survey1 = completed_survey
                    new_survey.similarity1 = similarity
                    new_survey.save()
                elif (new_survey.similarity1 >= similarity > new_survey.similarity2):
                    new_survey.related_survey2 = completed_survey
                    new_survey.similarity2 = similarity
                    new_survey.save()

    for i in survey_delete_list:
        SurveyOngoing.objects.get(id=i).delete()
