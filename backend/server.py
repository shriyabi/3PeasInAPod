from fastapi import FastAPI, WebSocket
from core import Connection


app = FastAPI()

@app.websocket("/ws")
async def websocket(websocket: WebSocket):
    connection: Connection = Connection(websocket)
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
