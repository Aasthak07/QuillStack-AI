const axios = require("axios");
require("dotenv").config();

(async () => {
  try {
    const response = await axios.get(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        headers: {
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );
    console.log("✅ Available Models:");
    response.data.models.forEach((model) =>
      console.log(`- ${model.name}`)
    );
  } catch (error) {
    console.error("❌ Error fetching models:", error.response?.data || error.message);
  }
})();
