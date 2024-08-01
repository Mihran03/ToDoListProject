# ToDoList/urls.py

from django.urls import path
from .views import fetch_todo_list

urlpatterns = [
    path('', fetch_todo_list, name='todo-list'),  # This handles 'api/todo/' when included
]
