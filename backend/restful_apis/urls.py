from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),
    path('user/', views.GetUserInformation.as_view()),
]
