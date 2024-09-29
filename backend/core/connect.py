from __future__ import annotations

from fastapi import WebSocket
from .types import User, Settings, Message, RegisterPayload, SettingsPayload, AnalysisPayload, RegisterResponse, SettingsResponse, AnalysisResponse
from ..utils.roboflow_api import roboflow_infer
from ..utils.openai_api import openai_infer
from ..utils.groq_api import get_groq_summary

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
                    try:
                        await self.handle_register(data)
                    except Exception as e:
                        error_message: str = str(e)
                        response: RegisterResponse = {
                            "type": "register",
                            "error_message": error_message,
                            "payload": {
                                "success": False,
                            }
                        }
                        await self.websocket.send_json(response)
                        
                case "settings":
                    try:
                        await self.handle_settings(data)
                    except Exception as e:
                        error_message: str = str(e)
                        response: SettingsResponse = {
                            "type": "settings",
                            "error_message": error_message,
                            "payload": {
                                "success": False,
                            }
                        }
                        await self.websocket.send_json(response)

                case "analysis":
                    try:
                        await self.handle_analysis(data)
                    except Exception as e:
                        error_message: str = str(e)
                        response: AnalysisResponse = {
                            "type": "analysis",
                            "error_message": error_message,
                            "payload": {
                                "success": False,
                            }
                        }
                        await self.websocket.send_json(response)

    async def disconnect(self) -> None:
        await self.websocket.close()

    async def handle_register(self, data: Message) -> None:
        payload: RegisterPayload = data["payload"]
        self.user = User(**payload["user"])
        self.settings = Settings(**payload["settings"])
        self.initialized = True

        response: RegisterResponse = {
            "type": "register",
            "payload": {
                "success": True,
            }
        }
        print(f"User {self.user['first_name']} {self.user['last_name']} registered.")
        await self.websocket.send_json(response)

    async def handle_settings(self, data: Message) -> None:
        payload: SettingsPayload = data["payload"]
        self.settings = Settings(**payload["settings"])

        response: SettingsResponse = {
            "type": "settings",
            "payload": {
                "success": True,
            }
        }

        await self.websocket.send_json(response)
        print(f"User {self.user['first_name']} {self.user['last_name']} updated settings.")

    async def handle_analysis(self, data: Message) -> None:
        payload: AnalysisPayload = data["payload"]

        response: AnalysisResponse = {
            "type": "analysis",
            "payload": {
                "success": True,
                "status": "Received",
            }
        }
        await self.websocket.send_json(response)

        roboflow_result = await roboflow_infer(payload["image_b64"])
        if not any(pred["confidence"] > 0.3 for pred in roboflow_result["predictions"]):
            response["payload"]["status"] = "Rejected"
            await self.websocket.send_json(response)
            return
        
        openai_result = await openai_infer(payload["image_b64"])

        if openai_result["action"] == "None":
            response["payload"]["status"] = "No_Response"
            await self.websocket.send_json(response)
            return

        # get cartesia audio

        analysis_response: AnalysisResponse = {
            "type": "analysis",
            "payload": {
                "success": True,
                "responded": True,
                "response_text": openai_result["message"],
                "severity": openai_result["severity"],
                "audio_b64": "audio_b64",
            }
        }
        await self.websocket.send_json(analysis_response)


        groq_summary = await get_groq_summary(openai_result, roboflow_result)
        analysis_response["payload"]["groq_summary"] = groq_summary
        analysis_response["payload"]["status"] = "Groq_Response"
        await self.websocket.send_json(analysis_response)
