import json
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse ,HttpResponseBadRequest
from .models import Survey, Item, Response, Cart
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
import json
from json import JSONDecodeError


# Create your views here.

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

def search(request, keyword = ''):
    if request.method == 'GET':
        surveys = list(Survey.objects.filter(title__icontains = keyword).values())
        return JsonResponse(surveys, safe=False)

    else:
        return HttpResponseBadRequest(['GET'])

def signup(request):    #create new
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            email = req_data['email']
        except (KeyError, json.decoder.JSONDecodeError) as e:
            return HttpResponse(status=400)
        if User.objects.filter(username = username).exists():
            return HttpResponse(status = 400)
        
        User.objects.create_user(username = username, email = email, password = password)
        return HttpResponse(status = 201)
    else:
        return HttpResponseBadRequest(['POST'])
