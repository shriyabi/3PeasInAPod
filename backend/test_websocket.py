import json
import asyncio
from websockets import connect
import base64

# Create mock data for the user and settings
user = dict(id="123", first_name="John", last_name="Doe")
settings = dict(user=user, speed=5, anger=3, curiosity=2, positivity=4, surprise=1, sadness=0)

async def test_websocket():
    uri = "ws://localhost:8000/ws"
    async with connect(uri) as websocket:
        await websocket.send(json.dumps({"type": "register", "payload": {"user": user, "settings": settings}}))
        reg_res = await websocket.recv()
        print(reg_res)

        
        with open("tests/images/bottle.jpg", "rb") as f:
            image = f.read()
            base64_image = base64.b64encode(image).decode("utf-8")
            await websocket.send(json.dumps({"type": "analysis", "payload": {"image": base64_image}}))

        print(reg_res)
        while reg_res['payload']['success']:
            analysis_res = await websocket.recv()
            print(analysis_res)


asyncio.run(test_websocket())
