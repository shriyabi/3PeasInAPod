from utils import roboflow_api
# import opencv

import unittest

import base64


class TestRoboflow(unittest.IsolatedAsyncioTestCase):
    async def test_roboflow(self):
        for i in range(10):
            with open("tests/images/bottle.jpg", "rb") as f:
                image = f.read()
                base64_image = base64.b64encode(image).decode("utf-8")
                result = await roboflow_api.roboflow_infer(base64_image)
                print(result)
                assert len(result["predictions"]) > 0
                img = roboflow_api.plot_bboxes_opencv(image, result)
                with open("tests/images/bottle_result.jpg", "wb") as f:
                    f.write(img)
                
                
                    
                    
if __name__ == '__main__':
    unittest.main()