from rest_framework.views import APIView
from .serializers import CommentSerializer, FriendRequestSerializer, PeopleSerializer, PostSerializer, UserProfileSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Comment, FriendRequest, Post
from django.contrib.auth import get_user_model
from django.db.models import Q, F


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
        user = request.user
        lookup = Q(user__in=user.friends.all()) | Q(user=user)
        posts = Post.objects.filter(lookup)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class LikePost(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        post = Post.objects.get(pk=request.data.get('post'))
        post.likes = F('likes') + 1
        post.save()
        return Response({"msg": "success"})


class FriendRequestSentList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend_requests = request.user.requester_name.all()
        serializer = FriendRequestSerializer(friend_requests, many=True)
        return Response(serializer.data)


class FriendRequestReceivedList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend_requests = request.user.accepter_name.all()
        serializer = FriendRequestSerializer(friend_requests, many=True)
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

    # def post(self, request):
    #     friend_request = FriendRequest.objects.get(
    #         pk=request.data['friend_request'])
    #     accepter = friend_request.accepter
    #     requester = friend_request.requester
    #     if request.user.id == accepter.id:
    #         requester.friends.add(accepter)
    #         accepter.friends.add(requester)
    #         friend_request.delete()
    #         return Response({"msg": "success"})
    #     else:
    #         return Response({"msg": "error"})

    def post(self, request):
        friend = get_user_model().objects.get(pk=request.data.get('friend'))
        user = request.user
        friend_request = user.accepter_name.get(requester=friend)
        user.friends.add(friend)
        friend.friends.add(user)
        friend_request.delete()
        return Response({"msg": "success"})


class DeleteFriend(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        user = request.user
        friend = get_user_model().objects.get(pk=request.data.get("friend"))
        user.friend.remove(friend)
        friend.friend.remove(user)
        return Response({"msg": "success"})


class FriendList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        friends = user.friends.all()
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data)


class PeopleList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        query = request.query_params.get('query')
        if query:
            people = get_user_model().objects.filter(
                Q(name__icontains=query) | Q(
                    surname__icontains=query) | Q(email__icontains=query)
            )
            serializer = PeopleSerializer(
                people, many=True, context={'request': request})
            return Response(serializer.data)
        return Response({"msg": "error"})


class CommentList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        comments = Comment.objects.filter(post=request.data.get('post'))
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)


class LikeComment(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        comment = Comment.objects.get(pk=request.data.get('comment_id'))
        comment.likes = F('likes') + 1
        comment.save()
        return Response({"msg": "success"})
