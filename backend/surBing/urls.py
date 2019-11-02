from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.signin, name='login'),
    path('logout/', views.signout, name='logout'),
    path('search/<str:keyword>/', views.search, name='search'),
    path('mycart/', views.mycart, name='mycart'),
    path('ml/', views.ml_analysis, name='ml_analysis')
]
