from fastapi import WebSocket
from .types import User, Settings


class Connection:
    def __init__(self, websocket: WebSocket, user: User, settings: Settings):
        self.websocket: WebSocket = websocket
        self.user: User = user
        self.settings: Settings = settings

    @classmethod
    async def connect(cls, websocket: WebSocket, user: User, settings: Settings):
        connection = cls(websocket, user, settings)
        await connection.websocket.accept()
        return connection
