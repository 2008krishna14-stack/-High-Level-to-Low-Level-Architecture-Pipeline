import { GoogleGenerativeAI } from "@google/generative-ai";
import Business from "../models/BusinessSchema.js";

const generateArchitecture = async (req, res) => {
    try {

        const { requirement } = req.body;
        console.log(requirement)



                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

                const model = genAI.getGenerativeModel({
                    model: "gemini-3-flash-preview",
                    generationConfig: { responseMimeType: "application/json" }
                });

                const prompt = `
You are a senior software architect and system designer.

Your task is to convert a high-level business requirement into
a detailed low-level technical architecture suitable for implementation
using a modern MERN-based or REST-based backend system.

Analyze the requirement carefully and break it down into
clear, practical, and implementable components.

Return the response strictly in VALID JSON format with the following keys:

1. "modules":
   - List all major system modules
   - For each module include:
     - name
     - responsibility
     - key_features

2. "database_schema":
   - Use a NoSQL (MongoDB-style) schema
   - For each collection include:
     - collection_name
     - fields (name, type, description)
     - relationships (if any)

3. "api_endpoints":
   - REST-style APIs
   - For each endpoint include:
     - method
     - endpoint
     - description
     - request_body (if applicable)
     - response_structure

4. "pseudocode":
   - Step-by-step logical flow
   - Focus on core business logic
   - Use simple, readable pseudo code (not a real programming language)

Important Rules:
- Do NOT include explanations outside JSON
- Do NOT add extra keys
- Keep the output concise but technically complete
- Assume the system will be built by a junior-to-mid level developer

Business Requirement:
"${requirement}"
`;

             

                const result = await model.generateContent(prompt);
                const responseText = result.response.text();

                const keywords = JSON.parse(responseText);


          





        return res.status(200).json(keywords);

    } catch (error) {
        console.error("Gemini Error:", error);
        return res.status(500).json({
            message: "Failed to generate SEO keywords",
            error: error.message
        });
    }
};

export default generateArchitecture;