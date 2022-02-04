from datetime import datetime
from tkinter import CASCADE
from django.db import models
from django.contrib.auth import get_user_model


class Post(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)