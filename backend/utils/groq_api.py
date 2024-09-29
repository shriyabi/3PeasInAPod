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
Output Format: A well-structured webpage in jsx text, formatted in sections.

Example Output:

<div className="bg-primary min-h-screen text-quadary">
            <div className="w-full p-5">
                <h1 className="text-2xl font-bold text-ternary underline p-4 rounded">The Environmental Impact of Disposing Glass Bottles Near Water Sources</h1>

                <div className="bg-quaternary p-4 rounded mt-4">
                    <h2 className="text-xl font-semibold text-secondary overline">Action Overview</h2>
                    <p>
                        You’ve thrown away a glass bottle near a creek, a choice that carries significant environmental risks. Let’s take a closer look at the possible consequences and what you can do instead.
                    </p>
                </div>

                <div className="bg-quaternary p-4 rounded mt-4">
                    <h2 className="text-xl font-semibold text-secondary overline">Environmental Impact</h2>
                    <p>
                        Glass is a non-biodegradable material, meaning it won’t break down easily in nature. When discarded near water sources like creeks, rivers, or lakes, glass poses several threats:
                    </p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Water Pollution: As the bottle degrades over time, small fragments of glass can end up in the water, contributing to long-term pollution.</li>
                        <li>Wildlife Harm: Aquatic animals, such as fish, birds, and other wildlife, might mistake glass for food, or they could be injured by sharp edges. Birds like geese could become particularly vulnerable near creeks.</li>
                        <li>Ecosystem Disruption: Glass fragments in water bodies can alter the ecosystem’s balance, potentially harming plant life and reducing water quality.</li>
                    </ul>
                </div>

                <div className="bg-quaternary p-4 rounded mt-4">
                    <h2 className="text-xl font-semibold text-secondary overline">Severity</h2>
                    <p>
                        Based on NeuralNudge’s assessment, this action has a severity rating of 7 out of 10, which means it has a significant potential to cause harm if the glass isn’t properly disposed of.
                    </p>
                </div>

                <div className="bg-quaternary p-4 rounded mt-4">
                    <h2 className="text-xl font-semibold text-secondary overline">RoboFlow’s Supplementary Data</h2>
                    <p>
                        RoboFlow detected an object it classified as “Glass” with a moderate confidence score of 0.57. While this detection reinforces the presence of a glass object, it’s important to rely on NeuralNudge’s more precise analysis for any actions you take.
                    </p>
                </div>

                <div className="bg-quaternary p-4 rounded mt-4">
                    <h2 className="text-xl font-semibold text-secondary overline"> What Can You Do Instead?</h2>
                    <p>
                        <strong>Recycle That Glass:</strong> Glass is 100% recyclable and can be reused indefinitely without losing quality. By tossing that bottle in the recycling bin instead of leaving it near the creek, you’re giving it a chance to become something new—a win for the environment and future generations.
                    </p>
                    <p>
                        <strong>Protect Wildlife:</strong> Recycling your glass bottle reduces the chances of wildlife encountering and being harmed by it.
                    </p>
                </div>
            </div>
        </div>
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
    print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content
