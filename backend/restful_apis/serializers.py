from rest_framework import serializers
from django.contrib.auth import get_user_model

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