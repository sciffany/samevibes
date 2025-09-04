import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { name, perceived, negations, reality } = await request.json();

    if (!perceived || !negations || !reality) {
      return NextResponse.json(
        { error: "Missing perceived or actual data" },
        { status: 400 }
      );
    }

    const prompt = `Based on the following information about a player in a social game:


PLAYER NAME: ${name}

REALITY:
${negations.join("\n")}
${reality.join("\n")}

WHAT FRIENDS THOUGHT:
${perceived.join("\n")}


Generate a fun, insightful, and personality-focused summary of this player's vibe and characteristics. It should be short and funny. It should start with a adjective and noun combo.`;

    console.log(prompt);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a fun, insightful personality analyzer for a social game. Generate engaging, positive descriptions of players based on their game behavior and how others perceive them.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    const vibe = completion.choices[0]?.message?.content?.trim();

    if (!vibe) {
      throw new Error("No response from OpenAI");
    }

    return NextResponse.json({ vibe });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to generate player vibe" },
      { status: 500 }
    );
  }
}
