import dotenv
import os


dotenv.load_dotenv()


def get_config():
    dotenv.load_dotenv()
    return {
        "GROQ_API_KEY": os.environ.get("GROQ_API_KEY"),
        "CARTEASIA_API_KEY": os.environ.get("CARTEASIA_API_KEY"),
        "OPENAI_API_KEY": os.environ.get("OPENAI_API_KEY"), 
    }
