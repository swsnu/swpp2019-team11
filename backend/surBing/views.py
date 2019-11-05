import json
from json import JSONDecodeError
from functools import wraps
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Survey, Cart, SurBingUser, Item, Response

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

def signup(request):    #create new
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
        return HttpResponseNotAllowed(['POST'])

# logout
@check_logged_in
def signout(request):
    if request.method == 'GET':
        logout(request)
        return HttpResponse(status=204)

    else:
        return HttpResponseNotAllowed(['GET'])

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
def surveys(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            items = req_data['item']
            title = req_data['title']
            upload_date = req_data['upload_date']
            survey_start_date = req_data['survey_start_date']
            survey_end_date = req_data['survey_end_date']
            content = req_data['content']
            respondant_count = req_data['respondant_count']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
        cur_survey = Survey(
            title=title, author=request.user, upload_date=upload_date,
            survey_start_date=survey_start_date,
            survey_end_date=survey_end_date,
            content=content, respondant_count=respondant_count
        )
        for item in items:
            try:
                responses = item['response']
                title = item['title']
                question_type = item['question_type']
            except KeyError:
                return HttpResponse(status=400)
            cur_item = Item(title=title, question_type=question_type)
            for response in responses:
                try:
                    respondant_id = response['respondant_id']
                    content = response['content']
                except KeyError:
                    return HttpResponse(status=400)
                cur_response = Response(respondant_id=respondant_id, content=content)
                cur_response.save()
                cur_item.response.add(cur_response)
            cur_item.save()
            cur_survey.item.add(cur_item)
        cur_survey.save()
        return HttpResponse(status=201)

    else:
        return HttpResponseBadRequest(['POST'])

@check_logged_in
def survey(request, survey_id):
    if request.method == 'GET':
        if not Survey.objects.filter(id=survey_id).exists():
            return HttpResponse(status=404)
        survey = Survey.objects.get(id=survey_id)
        survey_dict = {
            'title': survey.title, 'author': survey.author.username,
            'upload_date': survey.upload_date,
            'survey_start_date': survey.survey_start_date,
            'survey_end_date': survey.survey_end_date,
            'content': survey.content,
            'respondant_count': survey.respondant_count,
            'item': [],
        }
        for item in survey.item.all():
            item_dict = {
                'title': item.title,
                'question_type': item.question_type,
                'response': [],
            }
            for response in item.response.all():
                item_dict['response'].append({
                    'respondant_id': response.respondant_id,
                    'content': response.content,
                })
            survey_dict['item'].append(item_dict)
        return JsonResponse(survey_dict, safe=False)

    else:
        return HttpResponseBadRequest(['GET'])

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

# mock ml.
# arbitrarily returns item lists in cart.
@check_logged_in
def ml_analysis(request):
    if request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            id_list = req_data['id_list']
        except (KeyError, json.decoder.JSONDecodeError):
            return HttpResponse(status=400)

        cart = request.user.cart
        survey_list = cart.survey.filter(id__in=id_list)
        item_surveyid_list = []
        tmp_list = []
        for survey in survey_list:
            for item in survey.item.all():
                tmp_list.append({'surveyId': survey.id, 'title': item.title})
                if len(tmp_list) >= 2:
                    item_surveyid_list.append(tmp_list[:])
                    tmp_list = []

        return JsonResponse(item_surveyid_list, safe=False, status=200)

    else:
        return HttpResponseBadRequest(['PUT'])
