from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),
    path('users/user', views.UserProfile.as_view()),
    path('posts/new/', views.NewPost.as_view()),
]
