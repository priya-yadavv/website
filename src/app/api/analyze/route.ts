import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { code, language, actionType } = await req.json();

    if (!code || code.trim() === "") {
        return NextResponse.json({ error: "Please paste your code." }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "API Key missing. Please add GOOGLE_API_KEY." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey as string);

    let prompt = "";

    if (actionType === "fix") {
        prompt = `Fix all errors in the following code.

Ensure your response is STRICTLY formatted using this JSON schema:
{
  "correctedCode": "The corrected code string",
  "explanation": "What was wrong (short explanation)",
  "reviewStatus": "Minor Issues"
}

Code:
\`\`\`${language}
${code}
\`\`\``;
    } else if (actionType === "optimize") {
        prompt = `Optimize the following code for performance and readability.

Ensure your response is STRICTLY formatted using this JSON schema:
{
  "correctedCode": "The optimized code string",
  "explanation": "Key improvements made (short explanation)",
  "reviewStatus": "Correct"
}

Code:
\`\`\`${language}
${code}
\`\`\``;
    } else if (actionType === "explain") {
        prompt = `Explain the following code in simple terms.

Break it down step-by-step so a beginner can understand.

Ensure your response is STRICTLY formatted using this JSON schema:
{
  "explanation": "The step-by-step beginner friendly breakdown",
  "reviewStatus": "Correct"
}

Code:
\`\`\`${language}
${code}
\`\`\``;
    } else if (actionType === "convert") {
        prompt = `Convert the following code to ${language}.

Ensure:
- Same logic is preserved
- Clean and idiomatic code

Ensure your response is STRICTLY formatted using this JSON schema:
{
  "correctedCode": "The fully converted code string in ${language}",
  "explanation": "A short summary of any language-specific syntax or pattern choices made.",
  "reviewStatus": "Correct"
}

Code:
\`\`\`
${code}
\`\`\``;
    } else if (actionType === "audit") {
        prompt = `Find all bugs, errors, and vulnerabilities in this code.

Return only:
- List of issues
- Why they are problematic

Ensure your response is STRICTLY formatted using this JSON schema:
{
  "explanation": "A detailed list of all bugs, errors, and vulnerabilities found and why they are problematic.",
  "reviewStatus": "Poor"
}

Code:
\`\`\`${language}
${code}
\`\`\``;
    } else {
        prompt = `You are a senior software engineer and technical mentor. Analyze the following ${language} code and respond in the exact JSON format requested below.

CODE:
\`\`\`${language}
${code}
\`\`\`

Analyze the code and respond strictly with a valid JSON object matching this EXACT schema:
{
  "reviewStatus": "Minor Issues",
  "keyFeatures": ["Main programming concept 1", "Concept 2"],
  "complexity": {
    "time": "O(N)",
    "space": "O(1)"
  },
  "explanation": "A simple explanation of what the code does, why it is used, and real-world use cases.",
  "errors": ["Bug 1", "Logical issue 2"],
  "suggestedImprovements": ["Optimization 1", "Better practice 2"],
  "correctedCode": "The clean, improved, and properly formatted version of the code snippet."
}

CRITICAL RULES:
- "reviewStatus" MUST be exactly one of: "Correct", "Minor Issues", or "Contains Errors".
- If the code is perfectly clean, the "errors" array MUST contain exactly one string: "No major errors found."
`;
    }

    const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let resultText = response.text();
    
    // Explicitly wipe hallucinated markdown boundaries violating JSON strict parsing loops
    resultText = resultText.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    let resultJson = {};
    try {
        resultJson = JSON.parse(resultText || "{}");
    } catch (parseError) {
        console.error("Generative Engine JSON violation:", resultText);
        return NextResponse.json({ error: "The AI returned malformed logic. Please try analyzing the string again." }, { status: 500 });
    }

    return NextResponse.json({ result: resultJson });
  } catch (error: any) {
    console.error("LLM Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze code. " + error.message }, { status: 500 });
  }
}
