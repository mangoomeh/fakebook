from rest_framework.views import APIView
from .serializers import CommentSerializer, FriendRequestSerializer, PeopleSerializer, PostSerializer, ReceivedFriendRequestSerializer, SentFriendRequestSerializer, UserProfileSerializer, UserSerializer
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
            return Response({"msg": "success"})


class UserProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserProfileSerializer(request.user, many=False)
        return Response(serializer.data)


class NewPost(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = PostSerializer(
            data={**request.data, "user": request.user.id},
            context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)


class PostList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        lookup = Q(user__in=user.friends.all()) | Q(user=user)
        posts = Post.objects.filter(lookup)
        serializer = PostSerializer(
            posts, many=True, context={'request': request})
        return Response(serializer.data)


class FriendRequestSentList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend_requests = request.user.requester_name.all()
        serializer = SentFriendRequestSerializer(
            friend_requests, many=True)
        return Response(serializer.data)


class FriendRequestReceivedList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend_requests = request.user.accepter_name.all()
        serializer = ReceivedFriendRequestSerializer(
            friend_requests, many=True)
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
        print(request.data)
        friend = get_user_model().objects.get(pk=request.data.get("friend"))
        user.friends.remove(friend)
        friend.friends.remove(user)
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


class NewComment(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = CommentSerializer(
            data={**request.data, "user": request.user.id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)


class CommentList(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # get by post id
        comments = Comment.objects.filter(post=request.data.get('post'))
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class LikeComment(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        comment = Comment.objects.get(pk=request.data.get('comment_id'))
        comment.likes = F('likes') + 1
        comment.save()
        return Response({"msg": "success"})


class LikePost(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        post = Post.objects.get(pk=request.data.get("post_id"))
        if user not in post.likes.all():
            post.likes.add(user)
        else:
            post.likes.remove(user)
        return Response({"msg": "success"})


class updateUserBio(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        user.bio = request.data.get("content")
        user.save()
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


class updatePost(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        post_id = request.data.get("post_id")
        post = Post.objects.get(pk=post_id)
        post.content = request.data.get("content")
        post.save()
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data)
