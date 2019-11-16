from django.urls import path

from . import views

urlpatterns = [  # pylint: disable=invalid-name
    path('signup/', views.signup, name='signup'),
    path('token/', views.token, name='token'),
    path('checklogin/', views.checklogin, name='checklogin'),
    path('login/', views.signin, name='login'),
    path('logout/', views.signout, name='logout'),
    path('search/<str:keyword>/', views.search, name='search'),
    path('survey/', views.surveys, name='surveys'),
    path('survey/<int:survey_id>/', views.survey, name='survey'),
    path('mycart/', views.mycart, name='mycart'),
    # path('ml/', views.ml_analysis, name='ml_analysis')
]
