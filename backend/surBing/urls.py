from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup, name = 'signup'),
    path('survey/search/<str:keyword>/', views.search, name=''),
]
