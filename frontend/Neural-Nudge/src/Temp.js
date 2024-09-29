import React from 'react';

const Temp = () => {
    return (
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
  );
};

export default Temp;
