from utils import roboflow_api

import unittest

import base64


class TestRoboflow(unittest.TestCase):
    def test_roboflow(self):
        for i in range(10):
            with open("tests/images/bottle.jpg", "rb") as f:
                image = f.read()
                base64_image = base64.b64encode(image).decode("utf-8")
                result = roboflow_api.roboflow_infer(base64_image)
                print(result)
                assert len(result["predictions"]) > 0

if __name__ == '__main__':
    unittest.main()