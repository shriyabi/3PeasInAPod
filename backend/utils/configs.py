import dotenv
import os


dotenv.load_dotenv('.env')


def get_config(key):
    return os.getenv(key)
