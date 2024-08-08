# urls.py in your weather app

from django.urls import path
from .views import get_forecast

urlpatterns = [
    path('forecast/', get_forecast, name='api-forecast'),
]
