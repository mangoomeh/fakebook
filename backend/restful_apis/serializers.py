from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Comment, FriendRequest, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'

    def create(self, data):
        UserModel = get_user_model()
        User = UserModel.objects.create_user(**data)
        User.save()
        return User


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('name', 'surname', 'email',)


class PostSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='user.name')
    surname = serializers.ReadOnlyField(source='user.surname')
    comments_count = serializers.ReadOnlyField(source='comment_set.count')
    likes_count = serializers.ReadOnlyField(source='likes.count')
    liked_by_user = serializers.SerializerMethodField()

    def get_liked_by_user(self, instance):
        current_user = self.context.get('request').user
        return current_user in instance.likes.all()

    class Meta:
        model = Post
        fields = '__all__'


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'


class SentFriendRequestSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='accepter.name')
    surname = serializers.ReadOnlyField(source='accepter.surname')
    status = serializers.CharField(default="requested")

    class Meta:
        model = FriendRequest
        fields = '__all__'


class ReceivedFriendRequestSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='requester.name')
    surname = serializers.ReadOnlyField(source='requester.surname')
    status = serializers.ReadOnlyField(default="pending accept")

    class Meta:
        model = FriendRequest
        fields = '__all__'


class PeopleSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField('friendship')

    def friendship(self, people):
        user = self.context['request'].user
        friends = user.friends.all()
        friend_request_sent = user.requester_name.all()
        friend_request_received = user.accepter_name.all()
        if people in friends:
            return "friend"
        elif people.id in friend_request_sent.values_list(
            'accepter_id',
                flat=True):
            return "requested"
        elif people.id in friend_request_received.values_list(
            'requester_id',
                flat=True):
            return "pending accept"
        elif people == user:
            return "me"

    class Meta:
        model = get_user_model()
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_surname = serializers.ReadOnlyField(source='user.surname')

    class Meta:
        model = Comment
        fields = '__all__'
