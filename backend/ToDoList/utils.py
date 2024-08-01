# my_app/utils.py

import requests

def fetch_notion_tasks(notion_token, database_id):
    """
    Fetches tasks from a Notion database.
    :param notion_token: The integration token from Notion.
    :param database_id: The ID of the Notion database.
    :return: List of tasks or an empty list on failure.
    """
    url = f"https://api.notion.com/v1/databases/f938f734dfd14c6cad4d40a829ef5e3b/query"
    headers = {
        "Authorization": f"Bearer secret_UNw8UQwDPjTNcT29AKkPuJFMEJpHKjOKRhlu8EawKId",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    }

    print("Making request to Notion API...")
    print(f"URL: {url}")
    print(f"Headers: {headers}")
    response = requests.post(url, headers=headers)
    print(f"Response Status Code: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print("Data retrieved from Notion:", data)
        return data['results']
    else:
        print(f"Failed to fetch tasks: {response.status_code}, {response.text}")
        return []
