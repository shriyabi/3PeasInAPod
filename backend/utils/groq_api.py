from groq import Groq
from configs import get_config

client = Groq(
    api_key=get_config()["GROQ_API_KEY"],
)


async def get_groq_summary(transcript: str):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Please summarize the following transcript: \n" + transcript,
            }
        ],
        model="llama3-8b-8192",
    )
    print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content
