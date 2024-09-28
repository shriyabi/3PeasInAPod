from __future__ import annotations

from fastapi import WebSocket
from .types import User, Settings, Message, RegisterPayload, SettingsPayload

class Connection:
    def __init__(self, websocket: WebSocket):
        self.websocket: WebSocket = websocket
        self.initialized: bool = False

        self.user: User | None = None
        self.settings: Settings | None = None

    @classmethod
    async def connect(cls, websocket: WebSocket) -> Connection:
        connection: Connection = cls(websocket)
        await connection.websocket.accept()
        return connection
    
    async def register(self) -> None:
        while not self.initialized:
            data: Message = await self.websocket.receive_json()
            if data["type"] == "register":
                await self.handle_register(data)
    
    async def start(self) -> None:
        await self.register()
        while True:
            data: Message = await self.websocket.receive_json()
            match data["type"]:
                case "register":
                    await self.handle_register(data)
                case "settings":
                    await self.handle_settings(data)

    async def disconnect(self) -> None:
        await self.websocket.close()

    async def handle_register(self, data: Message) -> None:
        payload: RegisterPayload = data["payload"]
        self.user = User(**payload["user"])
        self.settings = Settings(**payload["settings"])
        self.initialized = True
        print(f"User {self.user['first_name']} {self.user['last_name']} registered.")

    async def handle_settings(self, data: Message) -> None:
        payload: SettingsPayload = data["payload"]
        self.settings = Settings(**payload["settings"])
        print(f"User {self.user['first_name']} {self.user['last_name']} updated settings.")
