from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Response
from core import Connection
from fastapi.middleware.cors import CORSMiddleware

from utils.current_img import get_current_img, set_current_img

app: FastAPI = FastAPI()
origins = [
    "*",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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



@app.get("/current_img")
async def read_current_img():
    ## get_current_img() returns the current image in bytes,
    # convert it to a base 64 string and return it
    
    img = get_current_img()
    return Response(content=img, media_type="image/jpeg")

