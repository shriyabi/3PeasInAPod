from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from core import Connection


app: FastAPI = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[Connection] = []

    async def connect(self, connection: Connection):
        self.active_connections.append(connection)

    def disconnect(self, connection: Connection):
        self.active_connections.remove(connection)


manager: ConnectionManager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    connection: Connection = await Connection.connect(websocket)
    await manager.connect(connection)
    try:
        await connection.start()
    except WebSocketDisconnect:
        manager.disconnect(connection)
