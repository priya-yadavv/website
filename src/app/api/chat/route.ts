import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { code, question, analysis } = await req.json();

    if (!code || !question) {
        return NextResponse.json({ error: "Missing code context or question." }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "API Key missing. Please add GOOGLE_API_KEY to your environment variables." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey as string);

    const prompt = `You are continuing a conversation about a piece of code.

Here is the original code:
\`\`\`
${code}
\`\`\`

Here is the previous analysis:
${analysis || "No prior analysis provided."}

User question:
${question}

Answer the user's question clearly and intelligently.

Rules:
- Always refer to the given code
- If needed, show updated code
- Keep explanation simple
- Be concise but helpful`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({ answer: response.text() });
  } catch (error: any) {
    console.error("LLM Chat Error:", error);
    return NextResponse.json({ error: "Failed to answer question. " + error.message }, { status: 500 });
  }
}
