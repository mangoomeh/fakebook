from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from .serializers import UserProfileSerializer, UserSerializer
from rest_framework.response import Response


class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class GetUserInformation(APIView):
    def get(self, request):
        serializer = UserProfileSerializer(request.user, many=False)
        return Response(serializer.data)

