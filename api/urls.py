from django.urls import path
from . import views

urlpatterns = [
    path('rooms', views.RoomView.as_view()),
    path('create-room', views.CreateRoomView.as_view()),
    path('get-room', views.GetRoom.as_view()),
    path('join-room', views.JoinRoom.as_view())
]