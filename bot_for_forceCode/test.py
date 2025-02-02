import requests
import json

data = {
    "user_id": "747475556794368032",
    "problem": "Three sum(linked list version)"
}

response = requests.post(
    'http://localhost:5000/getUpdates',
    json=data
)
print(response.json())
