import json
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from .models import Survey, Item, Response, Cart, SurBingUser
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
import json
from json import JSONDecodeError
from functools import wraps

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
        if SurBingUser.objects.filter(username = username).exists():
            return HttpResponse(status = 400)
        
        cart = Cart()
        cart.save()
        SurBingUser.objects.create_user(username = username, email = email, password = password, cart=cart)
        return HttpResponse(status = 201)
    else:
        return HttpResponseBadRequest(['POST'])

<<<<<<< HEAD
=======
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

def search(request, keyword = ''):
    if request.method == 'GET':
        surveys = list(Survey.objects.filter(title__icontains = keyword).values())
        return JsonResponse(surveys, safe=False)

    else:
        return HttpResponseBadRequest(['GET'])

def survey(request, id):
    if request.method == 'GET':
        survey = list(Survey.objects.filter(title="test title").values('title'))
        return JsonResponse(survey, safe=False)

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
        return JsonResponse(surveys, safe=False, status=200)
    
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            id = req_data['id']
        except (KeyError, json.decoder.JSONDecodeError):
            return HttpResponse(status=400)

        try:
            survey = Survey.objects.get(id=id)
        except Survey.DoesNotExist:
            return HttpResponse(status=404)
        
        cart = request.user.cart
        if cart.survey.filter(id=id).exists():
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
            survey.delete()

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
>>>>>>> master
