from typing import Literal, TypedDict

""" Data Typing """

SliderRange = Literal[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class User(TypedDict):
    id: str
    first_name: str
    last_name: str

class Settings(TypedDict):
    user: User
    speed: SliderRange
    anger: SliderRange
    curiosity: SliderRange
    positivity: SliderRange
    surprise: SliderRange
    sadness: SliderRange
    # voice: Voice

""" Json Payload Typing """

class RegisterPayload(TypedDict):
    user: User
    settings: Settings

class SettingsPayload(TypedDict):
    settings: Settings

class AnalysisPayload(TypedDict):
    image_b64: str
    timestamp: str
    location: str


""" Websocket Json Typing """

class Message(TypedDict):
    type: Literal["register", "settings"]
    error_message: str
    payload: dict

class RegisterMessage(Message):
    type: Literal["register"]
    payload: RegisterPayload

class SettingsMessage(Message):
    type: Literal["settings"]
    payload: SettingsPayload

class AnalysisMessage(Message):
    type: Literal["analysis"]
    payload: AnalysisPayload


""" Json Payload Response Typing """

class RegisterResponsePayload(TypedDict):
    success: bool

class SettingsResponsePayload(TypedDict):
    success: bool

class AnalysisResponsePayload(TypedDict):
    success: bool
    status: Literal["Received", "Rejected", "Accepted", "No_Response", "Responded"]
    responded: bool

    response_text: str
    severity: int
    audio_b64: str



""" Websocket Message Response """

class Response(TypedDict):
    type: Literal["register", "settings", "analysis"]
    payload: dict

class RegisterResponse(Response):
    type: Literal["register"]
    payload: RegisterResponsePayload

class SettingsResponse(Response):
    type: Literal["settings"]
    payload: SettingsResponsePayload

class AnalysisResponse(Response):
    type: Literal["analysis"]
    payload: AnalysisResponsePayload
    