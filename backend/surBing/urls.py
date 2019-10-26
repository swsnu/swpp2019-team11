from django.urls import path

from . import views

urlpatterns = [
    path('survey/search/<str:keyword>/', views.search, name='')
]