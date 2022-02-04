from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),
    path('user/', views.UserProfile.as_view()),
    path('newpost/', views.NewPost.as_view()),
]
