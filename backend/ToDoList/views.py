# my_app/views.py

from django.http import JsonResponse
from .utils import fetch_notion_tasks
from django.conf import settings  # Ensure settings are imported

def fetch_todo_list(request):
    """
    API endpoint that retrieves to-do list tasks from Notion and returns them as JSON.
    """
    tasks = fetch_notion_tasks(settings.NOTION_TOKEN, settings.DATABASE_ID)
    return JsonResponse({'tasks': tasks})
