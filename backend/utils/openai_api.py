from openai import OpenAI
from utils.configs import get_config


client = OpenAI(api_key=get_config()["OPENAI_API_KEY"])


USER_PROMPT = """

First, determine if the person in the image is throwing something away.

If the person is throwing something away, determine if they are throwing it in the trash or recycling bin.

If you think the person is throwing something on the ground or somewhere they shouldn't, please write
a few setences to tell them to not do that again, and give them some advice on how to properly dispose of the item.

Please be short and concise in your response.


Produce your response as if you are directly talking to the person in the image.


On a scale from 1 to 10, this is how aggressive you should be in your response:
{aggressiveness}

"""


async def get_image_summary(
    base64_image: str,  # base 64 image
    model: str = "gpt-4o",
    aggressiveness: int = 2,
    max_tokens: int = 300,
):

    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": USER_PROMPT.replace("{aggressiveness}", str(aggressiveness))},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg; base64,{base64_image}",
                            "detail": "high",
                        },
                    },
                ],
            }
        ],
        max_tokens=max_tokens,
    )

    print(response.choices[0].message.content)

    return response.choices[0].message.content
