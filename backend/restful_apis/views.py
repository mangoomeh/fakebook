from rest_framework.views import APIView
from .serializers import FriendRequestSerializer, PostSerializer, UserProfileSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import FriendRequest, Post
from django.contrib.auth import get_user_model


class RegisterUser(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class UserProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserProfileSerializer(request.user, many=False)
        return Response(serializer.data)


class NewPost(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = PostSerializer(
            data={**request.data, "user": request.user.id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class PostList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class SendFriendRequest(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = FriendRequestSerializer(data={
            "requester": request.user.id,
            "accepter": request.data['accepter']
        })
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class AcceptFriendRequest(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        friend_request = FriendRequest.objects.get(
            pk=request.data['friend_request'])
        accepter = friend_request.accepter
        requester = friend_request.requester
        if request.user.id == accepter.id:
            requester.friends.add(accepter)
            accepter.friends.add(requester)
            friend_request.delete()
            return Response({"msg": "success"})
        else:
            return Response({"msg": "error"})
