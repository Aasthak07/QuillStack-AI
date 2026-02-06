const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log("\n🔍 Fetching available Gemini models...\n");

        const models = await genAI.listModels();

        console.log("✅ Available Models for generateContent:\n");

        for (const model of models) {
            if (model.supportedGenerationMethods.includes("generateContent")) {
                console.log(`  📌 ${model.name.replace("models/", "")}`);
                console.log(`     Display Name: ${model.displayName}`);
                console.log(`     Description: ${model.description}`);
                console.log("");
            }
        }
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

listModels();
