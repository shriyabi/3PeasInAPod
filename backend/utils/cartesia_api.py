import requests
from utils.configs import get_config


async def cartesia_request(transcript: str) :
    api_key = get_config()["CARTEASIA_API_KEY"]
    url = "https://api.cartesia.ai/tts/bytes"
    headers = {
        "Cartesia-Version": "2024-06-10",
        "X-API-Key": api_key,
        "Content-Type": "application/json",
    }

    data = {
        "transcript": transcript,
        "model_id": "sonic-english",
        "voice": {"mode": "id", "id": "a0e99841-438c-4a64-b679-ae501e7d6091"},
        "output_format": {"container": "mp3", "encoding": "mp3", "sample_rate": 44100},
    }

    response = requests.post(url, headers=headers, json=data, stream=True)

    buffer = b""
    for chunk in response.iter_content(chunk_size=128):
        buffer += chunk
        
    return buffer


"""
    if response.status_code == 200:
        with open("cartesia_sonic.mp3", "wb") as f:
            for chunk in response.iter_content(chunk_size=128):
                f.write(chunk)
        print("Audio file saved successfully!")
    else:
        print(f"Error: {response.status_code} - {response.text}")"""


if __name__ == "__main__":
    import asyncio

    asyncio.run(cartesia_request("Hello, my name is Sonic."))
    
    