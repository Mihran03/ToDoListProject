# todo_project/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todo/', include('ToDoList.urls')),  # Includes the URLs from ToDoList correctly
]
