from pydantic import BaseModel
from typing import Literal


class User(BaseModel):
    id: str
    first_name: str
    last_name: str

SliderRange = Literal[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class Settings(BaseModel):
    user: User
    speed: SliderRange
    anger: SliderRange
    curiosity: SliderRange
    positivity: SliderRange
    surprise: SliderRange
    sadness: SliderRange
    # voice: Voice

