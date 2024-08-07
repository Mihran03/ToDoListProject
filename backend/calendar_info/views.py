# my_app/views.py

from django.http import JsonResponse
from .utils import fetch_notion_tasks
from django.conf import settings  # Ensure settings are imported

def fetch_calendar_info(request):
    """
    API endpoint that retrieves to-do list tasks from Notion and returns them as JSON.
    """
    calendar_info = fetch_notion_tasks(settings.NOTION_TOKEN, settings.DATABASE_ID)
    return JsonResponse({'calendar_info': calendar_info})
