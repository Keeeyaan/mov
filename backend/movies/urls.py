from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import movie_list, movie_detail

urlpatterns = [
    path('movies/', movie_list, name='movie-list'),
    path('movies/<int:pk>/', movie_detail, name='movie-detail'),
]
