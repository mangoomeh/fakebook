from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),
    path('users/user', views.UserProfile.as_view()),
    path('posts/new/', views.NewPost.as_view()),
    path('posts/', views.PostList.as_view()),
    path('addfriend/', views.SendFriendRequest.as_view()),
    path('acceptfriend/', views.AcceptFriendRequest.as_view()),
    path('friends/', views.FriendList.as_view()),
    path('people/', views.PeopleList.as_view()),
    path('friendrequests/sent/', views.FriendRequestSentList.as_view()),
    path('friendrequests/received/', views.FriendRequestReceivedList.as_view()),
]
