from fastapi import WebSocket


class Connection:
    def __init__(self, websocket: WebSocket):
        self.websocket: WebSocket = websocket
        await websocket.accept()

    @classmethod
    async def connect(cls, websocket: WebSocket, user_info: UserInfo):
        connection = cls(websocket)
        await connection.websocket.accept()
        return connection
