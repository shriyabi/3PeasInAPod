from groq import Groq
from utils.configs import get_config

client = Groq(
    api_key=get_config("GROQ_API_KEY"),
)


USER_PROMPT = """
Prompt:
You are EcoExtend, an advanced AI designed to expand on environmental insights and provide sustainability advocates with clear, detailed, and actionable information. You’ve been given data from two sources: NeuralNudge, a high-priority AI that classifies and advises on sustainable actions, and RoboFlow, a lower-priority system providing less accurate data. Your task is to generate a webpage that explains the environmental impact of an action or behavior, combining the detailed information from NeuralNudge with any less important, supplementary insights from RoboFlow.
The page should be informative but also engaging for users who care about sustainability. Ensure that any inaccuracies or lower-confidence predictions from RoboFlow are clearly marked as such, so users understand the importance of reliable data.
Here is your input:
NeuralNudge Data:
json
{{
  "action": "Throwing away a glass bottle near a creek",
  "environmental_impact": "Potential pollution of water and harm to wildlife",
  "waste_type": "Glass bottle",
  "severity": 7,
  "message": "Uh-oh! I see a glass bottle making its way to a creek—don’t let those geese think it’s a fancy new home decor. How about we toss that into recycling instead? Bonus: geese stay alive, and you get good karma!"
}}

RoboFlow Data:
json
{{
  "inference_id": "82eead43-c98a-42a6-91db-6646a3b0a297",
  "time": 0.10348030500017558,
  "image": {{
    "width": 4284,
    "height": 5712
  }},
  "predictions": [
    {{
      "x": 2072.2734375,
      "y": 2119.6875,
      "width": 2192.203125,
      "height": 2119.6875,
      "confidence": 0.5745677947998047,
      "class": "Glass",
      "class_id": 1,
      "detection_id": "cdec99da-22d1-4702-8693-a7d2d3f63600"
    }}
  ]
}}

Steps:
Create a header that reflects the topic (e.g., “The Environmental Impact of Disposing Glass Bottles Near Water Sources”).
Summarize the action and environmental impact described in NeuralNudge’s data.
Provide a detailed breakdown of the environmental risks associated with the action (e.g., glass pollution, harm to wildlife, water contamination), ensuring this is grounded in reliable, science-backed information.
Briefly discuss any additional information from RoboFlow, ensuring it is clearly marked as lower-confidence (e.g., “RoboFlow’s detection suggests the material could be glass, with a moderate confidence score of 0.57”).
Offer a positive alternative (such as recycling or proper disposal) and describe the benefits for both the user and the environment.
Include links or tips for users to learn more about sustainable practices (e.g., how to recycle glass properly or local recycling programs).
Keep the tone educational, but accessible to users who may not have an in-depth understanding of environmental science, and make sure the page is visually structured in a way that’s easy to navigate.
Output Format: Output as plain text.
OpenAI Result:
{openai_result}

RoboFlow Result:
{roboflow_result}

"""


async def get_groq_summary(openai_result: dict, roboflow_result: dict):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": USER_PROMPT.format(openai_result=openai_result, roboflow_result=roboflow_result),
            }
        ],
        model="llama3-8b-8192",
    )
    content = chat_completion.choices[0].message.content
    # Remove any text up to the first '<'
    start_index = content.find('<')
    # Find the last '>'
    end_index = content.rfind('>')
    if start_index != -1 and end_index != -1:
        cleaned_content = content[start_index:end_index+1]
    else:
        cleaned_content = content  # If '<' or '>' not found, return the original content
    print(cleaned_content)
    return cleaned_content
