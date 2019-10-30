from django.urls import path

from . import views

urlpatterns = [
    path('search/<str:keyword>/', views.search, name='')
]