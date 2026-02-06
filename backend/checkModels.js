const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

async function getAvailableModels() {
    try {
        const response = await axios.get(
            "https://generativelanguage.googleapis.com/v1beta/models",
            {
                params: { key: process.env.GEMINI_API_KEY }
            }
        );

        let output = "\n✅ Available Models for generateContent:\n\n";

        response.data.models.forEach((model) => {
            if (model.supportedGenerationMethods?.includes("generateContent")) {
                const modelName = model.name.replace("models/", "");
                output += `📌 ${modelName}\n`;
                output += `   Display: ${model.displayName}\n`;
                output += `   Methods: ${model.supportedGenerationMethods.join(", ")}\n\n`;
            }
        });

        console.log(output);
        fs.writeFileSync("available_models.txt", output);
        console.log("✅ Saved to available_models.txt");

    } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
    }
}

getAvailableModels();
