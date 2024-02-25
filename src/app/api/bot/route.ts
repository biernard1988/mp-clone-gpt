import openai from "@/utils/openai";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  const { key, messages } = await req.json();

  const chatCompletion = await openai(key).chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
  const message = chatCompletion.choices[0].message;

  return NextResponse.json({
    messages: messages.concat(message),
    status: HttpStatusCode.Ok,
  });
}
