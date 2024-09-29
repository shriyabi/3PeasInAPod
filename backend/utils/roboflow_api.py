# import the inference-sdk
from inference_sdk import InferenceHTTPClient
from utils.configs import get_config

# initialize the client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com", api_key=get_config()["ROBOFLOW_API_KEY"]
)


async def roboflow_infer(base64_image: str):
    result = CLIENT.infer(base64_image, model_id=get_config()["ROBOFLOW_MODEL_ID"])
    return result
