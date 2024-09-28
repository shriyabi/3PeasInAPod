from typing import Literal, TypedDict


class User(TypedDict):
    id: str
    first_name: str
    last_name: str

SliderRange = Literal[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class Settings(TypedDict):
    user: User
    speed: SliderRange
    anger: SliderRange
    curiosity: SliderRange
    positivity: SliderRange
    surprise: SliderRange
    sadness: SliderRange
    # voice: Voice

class RegisterPayload(TypedDict):
    user: User
    settings: Settings

class SettingsPayload(TypedDict):
    settings: Settings

class Message(TypedDict):
    type: Literal["register", "settings"]
    payload: dict

class RegisterMessage(TypedDict):
    type: Literal["register"]
    payload: RegisterPayload

class SettingsMessage(TypedDict):
    type: Literal["settings"]
    payload: SettingsPayload


