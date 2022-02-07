from django.db import models
from django.contrib.auth import get_user_model


class Post(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)

    class Meta:
        ordering=['-timestamp']


class FriendRequest(models.Model):
    requester = models.ForeignKey(
        get_user_model(), related_name="requester_name", on_delete=models.CASCADE)
    accepter = models.ForeignKey(
        get_user_model(), related_name="accepter_name", on_delete=models.CASCADE)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)

    class Meta:
        ordering=['-timestamp']