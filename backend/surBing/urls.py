from django.urls import path

from . import views

urlpatterns = [  # pylint: disable=invalid-name
    path('signup/', views.signup, name='signup'),
    path('token/', views.token, name='token'),
    path('checklogin/', views.checklogin, name='checklogin'),
    path('login/', views.signin, name='login'),
    path('logout/', views.signout, name='logout'),
    path('search/<str:keyword>/', views.search, name='search'),

    path('survey/completed/<int:survey_id>/', views.survey, name='survey'),
    path('make/', views.makeSurvey, name='making'),
    path('survey/ongoing/<int:survey_id>/', views.onGoingSurvey, name='onGoingSurvey'),
    path('participate/<int:survey_id>/', views.participate, name='participate'),
    path('cart/', views.mycart, name='mypage'),
    # path('mypage/surveyCompleted/', views.mypage_ongoing, name='mypage_ongoing'),
    # path('mypage/surveyOngoing', view.mypage_completed, name='mypage_completed')

    # path('ml/', views.ml_analysis, name='ml_analysis')
]
