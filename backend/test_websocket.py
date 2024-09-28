import json
import asyncio
from websockets import connect
from core.types import User, Settings

# Create mock data for the user and settings
user = User(id="123", first_name="John", last_name="Doe")
settings = Settings(user=user, speed=5, anger=3, curiosity=2, positivity=4, surprise=1, sadness=0)

async def test_websocket():
    uri = "ws://localhost:8000/ws"
    async with connect(uri) as websocket:
        message = {"type": "register", "payload": {"user": user, "settings": settings}}
        message_json = json.dumps(message)
        await websocket.send(message_json)
        print(await websocket.recv())


asyncio.run(test_websocket())
