from utils import openai_api

import unittest

import base64


class TestOpenAI(unittest.IsolatedAsyncioTestCase):
    async def test_openai(self):
        with open("tests/images/bottle.jpg", "rb") as f:
            image = f.read()
            base64_image = base64.b64encode(image).decode("utf-8")
            result = await openai_api.get_image_summary(base64_image, aggressiveness=10, anger=10, curiosity=0, positivity=0, surprise=10, sadness=0, speed=5)
            print(result)

if __name__ == '__main__':
    unittest.main()