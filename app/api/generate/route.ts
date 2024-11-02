import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY });

export async function POST(req: Request) {
  try {
    const { pantryList } = await req.json();

    const systemPrompt = `
      Give me 5 recipes that can be made with the ingredients provided:
      ${pantryList}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: "Generate recipes" }],
      model: "gpt-3.5-turbo"
    });

    console.log('completion ', completion);

    return NextResponse.json(completion);

  } catch (error) {
    console.error('There was an error', error);

    return NextResponse.json({ error: 'There was an error processing your request' }, { status: 500 });
  }
}
