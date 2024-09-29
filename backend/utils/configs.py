import dotenv
import os


dotenv.load_dotenv('.env')


def get_config():
    dotenv.load_dotenv()
    return {
        "GROQ_API_KEY": os.environ.get("GROQ_API_KEY"),
        "CARTEASIA_API_KEY": os.environ.get("CARTEASIA_API_KEY"),
        "OPENAI_API_KEY": os.environ.get("OPENAI_API_KEY"), 
        "ROBOFLOW_API_KEY": os.environ.get("ROBOFLOW_API_KEY"),
        "ROBOFLOW_MODEL_ID": os.environ.get("ROBOFLOW_MODEL_ID"),
        "ROBOFLOW_ENDPOINT": os.environ.get("ROBOFLOW_ENDPOINT"),
    }
