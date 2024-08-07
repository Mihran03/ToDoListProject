# ToDoList/urls.py

from django.urls import path
from .views import fetch_calendar_info

urlpatterns = [
    path('', fetch_calendar_info, name='calendar_info'),  # This handles 'api/todo/' when included
]
