
# views.py in your weather app

import requests
from django.http import JsonResponse

def get_forecast(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    api_key = '94f323d479584233837153447240808'
    url = f'http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={lat},{lon}&days=7'
    response = requests.get(url)
    return JsonResponse(response.json())
