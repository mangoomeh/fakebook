from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FriendRequest, Post


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
    user_name = serializers.ReadOnlyField(source='user.name')

    class Meta:
        model = Post
        fields = '__all__'


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'


class PeopleSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField('friendship')

    def friendship(self, people):
        user = self.context['request'].user
        friends = user.friends.all()
        user_friend_requests = user.accepter.all()
        people_friend_requests = people.accepter.all()
        print(friends, user_friend_requests, people_friend_requests)
        if people in friends:
            return "friend"
        elif people in user_friend_requests:
            return "requested"
        elif user in people_friend_requests:
            return "pending accept"

    class Meta:
        model = get_user_model()
        fields = '__all__'
