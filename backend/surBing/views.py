import json
from functools import wraps
from json import JSONDecodeError
from datetime import datetime

from django.contrib.auth import login, authenticate, logout
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import SurveyOngoing, Survey, Cart, SurBingUser, Item, Response, Selection


# Create your views here.
def check_logged_in(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if args and args[0].user.is_authenticated:
            return func(*args, **kwargs)
        return HttpResponse(status=401)

    return wrapper


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


def checklogin(request):
    if request.user.is_authenticated:
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)


def signup(request):  # create new
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            email = req_data['email']
        except (KeyError, json.decoder.JSONDecodeError):
            return HttpResponse(status=400)
        if SurBingUser.objects.filter(username=username).exists():
            return HttpResponse(status=400)

        cart = Cart()
        cart.save()
        SurBingUser.objects.create_user(username=username, email=email,
                                        password=password, cart=cart)
        return HttpResponse(status=201)

    else:
        return HttpResponseBadRequest(['POST'])


# login
def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)

    else:
        return HttpResponseBadRequest(['POST'])


# logout
@check_logged_in
def signout(request):
    if request.method == 'GET':
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponseBadRequest(['GET'])


@check_logged_in
def search(request, keyword=''):
    if request.method == 'GET':
        surveys = list(Survey.objects.filter(title__icontains=keyword).values())
        for survey in surveys:
            survey['author'] = SurBingUser.objects.get(id=survey['author_id']).username
            del survey['author_id']
        return JsonResponse(surveys, safe=False)

    else:
        return HttpResponseBadRequest(['GET'])


# add new survey to the database
# only accept POST
# 201 if success
@check_logged_in
def makeSurvey(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            survey_start_date = req_data['survey_start_date']
            survey_end_date = req_data['survey_end_date']
            content = req_data['content']
            target_respondant_count = req_data['target_respondant_count']
            target_age_start = req_data['target_age_start']
            target_age_end = req_data['target_age_end']
            target_gender = req_data['target_gender']
            open_date = req_data['open_date']
            items = req_data['item']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)

        survey = SurveyOngoing(
            title=title, author=request.user,
            survey_start_date=datetime.strptime(survey_start_date, '%Y/%m/%d').date(),
            survey_end_date=datetime.strptime(survey_end_date, '%Y/%m/%d').date(),
            open_date=datetime.strptime(open_date, '%Y/%m/%d').date(),
            content=content,
            respondant_count=0,
            target_respondant_count=target_respondant_count,
            target_age_start=int(target_age_start),
            target_age_end=int(target_age_end),
            target_gender=target_gender
        )
        survey.save()

        for item in items:
            try:
                number = item['number']
                title = item['title']
                question_type = item['question_type']
                selection_list = item['selection']
                multiple_choice = item['multiple_choice']
            except KeyError:
                return HttpResponse(status=400)

            cur_item = Item(number=number,
                            title=title,
                            question_type=question_type,
                            personal_data=False,
                            multiple_choice=multiple_choice)
            cur_item.save()
            for selection in selection_list:
                cur_selection = Selection(number=selection['number'], content=selection['content'])
                cur_selection.save()
                cur_item.selection.add(cur_selection)
            cur_item.save()
            survey.item.add(cur_item)
        survey.save()
        return HttpResponse(status=201)

    else:
        return HttpResponseBadRequest(['POST'])


# for searching completed survey.
@check_logged_in
def survey(request, survey_id):
    if request.method == 'GET':
        if not Survey.objects.filter(id=survey_id).exists():
            return HttpResponse(status=404)
        survey = Survey.objects.get(id=survey_id)
        survey_dict = {
            'id': survey.id,
            'title': survey.title, 'author': survey.author.username,
            'upload_date': survey.upload_date.strftime('%y/%m/%d'),
            'survey_start_date': survey.survey_start_date.strftime('%y/%m/%d'),
            'survey_end_date': survey.survey_end_date.strftime('%y/%m/%d'),
            'content': survey.content,
            'respondant_count': survey.respondant_count,
            'target_age_start': survey.target_age_start,
            'target_age_end': survey.target_age_end,
            'target_gender': survey.target_gender,
            'item': [],
        }
        for item in survey.item.all():
            item_dict = {
                'title': item.title,
                'question_type': item.question_type,
                'selection': [],
                'response': [],
            }
            for selection in item.selection.all():
                item_dict['selection'].append({
                    'number': selection.number,
                    'content': selection.content,
                })
            for response in item.response.all():
                item_dict['response'].append({
                    'respondant_number': response.respondant_number,
                    'content': response.content,
                })
            survey_dict['item'].append(item_dict)
        return JsonResponse(survey_dict, safe=False)
    else:
        return HttpResponseBadRequest(['GET'])


@check_logged_in
def onGoingSurvey(request, survey_id):
    if request.method == 'GET':
        if not SurveyOngoing.objects.filter(id=survey_id).exists():
            return HttpResponse(status=404)
        survey = SurveyOngoing.objects.get(id=survey_id)
        survey_dict = {
            'id': survey.id,
            'title': survey.title, 'author': survey.author.username,
            'upload_date': survey.upload_date.strftime('%y/%m/%d'),
            'survey_start_date': survey.survey_start_date.strftime('%y/%m/%d'),
            'survey_end_date': survey.survey_end_date.strftime('%y/%m/%d'),
            'target_age_start': survey.target_age_start,
            'target_age_end': survey.target_age_end,
            'target_gender': survey.target_gender,
            'target_response_count': survey.target_respondant_count,
            'content': survey.content,
            'respondant_count': survey.respondant_count,
            'item': [],
        }
        for item in survey.item.all():
            item_dict = {
                'number': item.number,
                'title': item.title,
                'personal_data': item.personal_data,
                'multiple_choice': item.multiple_choice,
                'question_type': item.question_type,
                'selection': [],
                'response': [],
            }
            for response in item.response.all():
                item_dict['response'].append({
                    'respondant_number': response.respondant_number,
                    'content': response.content,
                })
            for selection in item.selection.all():
                item_dict['selection'].append({
                    'number': selection.number,
                    'content': selection.content,
                })

            survey_dict['item'].append(item_dict)
        return JsonResponse(survey_dict, safe=False)
    else:
        return HttpResponseBadRequest(['GET'])


@check_logged_in
def participate(request, survey_id):
    if request.method == 'POST':

        if not SurveyOngoing.objects.filter(id=survey_id).exists():
            return HttpResponse(status=404)
        survey = SurveyOngoing.objects.get(id=survey_id)
        survey.respondant_count += 1
        survey.save()
        response_list = json.loads(request.body.decode())
        survey.item.all()
        for item in survey.item.all():
            for response in response_list:
                if (item.number == response['number']):
                    cur_response = Response(
                        respondant_number=survey.respondant_count + 1,
                        content=response['content'])
                    cur_response.save()
                    item.response.add(cur_response)
                    break
            item.save()
        survey.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseBadRequest(['POST'])


# mycart : api for cart
# GET
# - get all surveys in current user's cart
# - no argument needed
# - 200 when succeed
#
# POST
# - add survey to cart
# - argument : {id: <survey id>}
# - 200 when the cart already have that survey
# - 201 when successfully added
# - 400 for bad json request
# - 404 when there is no such survey with provided id
#
# PUT
# - delete survey from cart (** DELETE cannot receive additional data **)
# - argument : {id_list : [list of survey id]}
# - 200 when succeed
@check_logged_in
def mycart(request):
    if request.method == 'GET':
        cart = request.user.cart
        surveys = list(cart.survey.all().values())
        for survey in surveys:
            survey['author'] = SurBingUser.objects.get(id=survey['author_id']).username
            del survey['author_id']
        return JsonResponse(surveys, safe=False, status=200)

    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            survey_id = req_data['id']
        except (KeyError, json.decoder.JSONDecodeError):
            return HttpResponse(status=400)

        try:
            survey = Survey.objects.get(id=survey_id)
        except Survey.DoesNotExist:
            return HttpResponse(status=404)

        cart = request.user.cart
        if cart.survey.filter(id=survey_id).exists():
            return HttpResponse(status=200)
        else:
            cart.survey.add(survey)
            return HttpResponse(status=201)

    elif request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            id_list = req_data['id_list']
        except (KeyError, json.decoder.JSONDecodeError):
            return HttpResponse(status=400)

        cart = request.user.cart
        to_delete_list = cart.survey.filter(id__in=id_list)
        for survey in to_delete_list:
            cart.survey.remove(survey)

        return HttpResponse(status=200)

    else:
        return HttpResponseBadRequest(['GET', 'POST', 'PUT'])


@check_logged_in
def participating_list(request):
    if request.method == 'GET':
        user = request.user
        participated_surveys = user.participating.all()
        today = datetime.date.today()
        surveys = list(SurveyOngoing.objects
                       .filter(target_gender=user.gender,
                               target_age_start__lte=user.age,
                               target_age_end__gte=user.age,
                               survey_end_date__gte=today)
                       .exclude(participant__in=participated_surveys)
                       .values()
                       )
        return JsonResponse(surveys, safe=False, status=200)
    else:
        return HttpResponseBadRequest(['GET'])


@check_logged_in
def my_survey_ongoing(request):
    if request.method == 'GET':
        user = request.user
        survey_list = list(SurveyOngoing.objects.filter(author=user).values())
        for survey in survey_list:
            survey['author'] = user.username
            del survey['author_id']
        return JsonResponse(survey_list, safe=False)
    else:
        return HttpResponseBadRequest(['GET'])


@check_logged_in
def my_survey_completed(request):
    if request.method == 'GET':
        user = request.user
        survey_list = list(Survey.objects.filter(author=user).values())
        for survey in survey_list:
            survey['author'] = user.username
            del survey['author_id']
        return JsonResponse(survey_list, safe=False)
    else:
        return HttpResponseBadRequest(['GET'])
