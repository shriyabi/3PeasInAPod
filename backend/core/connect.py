from __future__ import annotations

import json
import base64
from fastapi import WebSocket
from .types import User, Settings, Message, RegisterPayload, SettingsPayload, AnalysisPayload, RegisterResponse, SettingsResponse, AnalysisResponse
from utils.current_img import set_current_img
from utils.roboflow_api import roboflow_infer
from utils.openai_api import openai_infer
from utils.groq_api import get_groq_summary
from utils.cartesia_api import cartesia_request
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S")

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
        if not any(pred["confidence"] > 0 for pred in roboflow_result["predictions"]):
            logging.info("No object detected.")
            response["payload"]["status"] = "Rejected"
            set_current_img(base64.b64decode((payload["image_b64"])))
            await self.websocket.send_json(response)
            return
        
        response["payload"]["status"] = "Accepted"
        # print("Object detected.")
        logging.info("Object detected.")
        set_current_img(base64.b64decode((payload["image_b64"])))
        await self.websocket.send_json(response)
        
        openai_result = await openai_infer(payload["image_b64"],
                                           speed=self.settings["speed"],
                                           anger=self.settings["anger"],
                                           curiosity=self.settings["curiosity"],
                                           positivity=self.settings["positivity"],
                                           surprise=self.settings["surprise"],
                                           sadness=self.settings["sadness"],
                                           aggressiveness=self.settings["aggressiveness"],
                                           first_name=self.user["first_name"],
                                           last_name=self.user["last_name"])
        openai_result = json.loads(openai_result)

        if openai_result["action"] == "None":
            response["payload"]["status"] = "No_Response"
            await self.websocket.send_json(response)
            return
        
        audio_bytes = await cartesia_request(openai_result["message"])
        audio_b64 = base64.b64encode(audio_bytes).decode("utf-8")

        analysis_response: AnalysisResponse = {
            "type": "analysis",
            "payload": {
                "success": True,
                "status": "Responded",
                "responded": True,
                "response_text": openai_result["message"],
                "severity": openai_result["severity"],
                "audio_b64": audio_b64,
            }
        }

        await self.websocket.send_json(analysis_response)


        groq_summary = await get_groq_summary(openai_result, roboflow_result)
        analysis_response["payload"]["groq_summary"] = groq_summary
        analysis_response["payload"]["status"] = "Groq_Response"
        await self.websocket.send_json(analysis_response)

