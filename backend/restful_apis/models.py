from django.db import models
from django.conf import settings


class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="post_liker", blank=True)

    class Meta:
        ordering = ['-timestamp']


class FriendRequest(models.Model):
    requester = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="requester_name", on_delete=models.CASCADE)
    accepter = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="accepter_name", on_delete=models.CASCADE)


class Comment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="commenter", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="comment_liker", blank=True
    )

    class Meta:
        ordering = ['-timestamp']
