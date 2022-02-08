from django.db import models
from django.contrib.auth import get_user_model


class Post(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        get_user_model(), related_name="post_liker", blank=True)

    class Meta:
        ordering = ['-timestamp']


class FriendRequest(models.Model):
    requester = models.ForeignKey(
        get_user_model(), related_name="requester_name", on_delete=models.CASCADE)
    accepter = models.ForeignKey(
        get_user_model(), related_name="accepter_name", on_delete=models.CASCADE)


class Comment(models.Model):
    user = models.ForeignKey(
        get_user_model(), related_name="commenter", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        get_user_model(), related_name="comment_liker", blank=True
    )

    class Meta:
        ordering = ['-timestamp']
