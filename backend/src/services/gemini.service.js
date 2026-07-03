import ai from "../config/gemini.js";

export const generateCompatibility = async (prompt) => {

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let text = response.text.trim();

        // Remove markdown code fences if present
        text = text.replace(/```json/g, "");
        text = text.replace(/```/g, "");
        text = text.trim();

        return JSON.parse(text);

    } catch (error) {

        throw error;

    }

};