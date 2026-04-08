require('dotenv').config({path: './backend/.env'});
const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function checkModels() {
    try {
        console.log("🔍 Querying authorized models for your API key...");
        const response = await fetch(URL);
        const data = await response.json();
        
        if (data.error) {
            console.error("❌ API Error:", data.error.message);
            return;
        }

        console.log("\n✅ Authorized Models Found:");
        data.models.forEach(m => {
            console.log(` - ${m.name.replace('models/', '')} [${m.supportedGenerationMethods.join(', ')}]`);
        });
        
        console.log("\n💡 Note: If you hit a 429 quota error earlier, it means the DAILY limit for these models is exhausted.");
    } catch (err) {
        console.error("❌ Request failed:", err.message);
    }
}

checkModels();
