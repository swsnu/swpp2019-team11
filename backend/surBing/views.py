import json
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse ,HttpResponseBadRequest
from .models import Survey, Item, Response, Cart
from django.contrib.auth import  authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie
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


