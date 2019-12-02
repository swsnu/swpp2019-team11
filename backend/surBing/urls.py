from django.urls import path

from . import views

urlpatterns = [  # pylint: disable=invalid-name
    path('signup/', views.signup, name='signup'),
    path('token/', views.token, name='token'),
    path('checklogin/', views.checklogin, name='checklogin'),
    path('login/', views.signin, name='login'),
    path('logout/', views.signout, name='logout'),
    path('userinfo/', views.getinfo, name='getinfo'),
    path('search/<str:keyword>/', views.search, name='search'),

    path('survey/completed/<int:survey_id>/', views.survey, name='survey'),
    path('make/', views.makeSurvey, name='making'),
    path('survey/ongoing/<int:survey_id>/', views.onGoingSurvey, name='onGoingSurvey'),
    path('participate/<int:survey_id>/', views.participate, name='participate'),
    path('participatinglist/', views.participating_list, name='participating_list'),
    path('mypage/cart/', views.mycart, name='cart'),
    path('mypage/surveyCompleted/', views.my_survey_completed, name='mypage_ongoing'),
    path('mypage/surveyOngoing/', views.my_survey_ongoing, name='mypage_completed')

]
