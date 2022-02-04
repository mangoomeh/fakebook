from rest_framework.views import APIView
from .serializers import PostSerializer, UserProfileSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


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
        serializer = PostSerializer(data={**request.data, "user": request.user.id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
