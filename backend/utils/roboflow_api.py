from inference_sdk import InferenceHTTPClient
from utils.configs import get_config

import cv2
import numpy as np

CLIENT = InferenceHTTPClient(
    api_url=get_config("ROBOFLOW_ENDPOINT"), api_key=get_config("ROBOFLOW_API_KEY")
)


async def roboflow_infer(base64_image: str):
    result = CLIENT.infer(base64_image, model_id=get_config("ROBOFLOW_MODEL_ID"))
    return result


def plot_bboxes_opencv(image_bytes, inference_dict):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    for prediction in inference_dict["predictions"]:
        x = prediction["x"]
        y = prediction["y"]
        width = prediction["width"]
        height = prediction["height"]
        confidence = prediction["confidence"]
        class_name = prediction["class"]

        top_left_x = int(x - width / 2)
        top_left_y = int(y - height / 2)
        bottom_right_x = int(x + width / 2)
        bottom_right_y = int(y + height / 2)

        cv2.rectangle(
            img,
            (top_left_x, top_left_y),
            (bottom_right_x, bottom_right_y),
            (0, 255, 0),
            2,
        )

        label = f"{class_name}: {confidence:.2f}"
        cv2.putText(
            img,
            label,
            (top_left_x, top_left_y - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 255, 0),
            2,
        )

    _, buffer = cv2.imencode(".jpg", img)
    return buffer.tobytes()
