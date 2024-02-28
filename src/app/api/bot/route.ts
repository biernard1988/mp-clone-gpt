// Importando o utilitário openai do diretório "utils".
import openai from "@/utils/openai";
// Importando HttpStatusCode do pacote "axios".
import { HttpStatusCode } from "axios";
// Importando NextResponse do pacote "next/server".
import { NextResponse } from "next/server";

// Definindo a função assíncrona POST, que trata requisições POST.
export async function POST(req: Request): Promise<NextResponse> {
  // Extraindo chave e dados do chat do corpo da requisição.
  const { key, chat } = await req.json();

  // Extraindo mensagens do chat.
  const { messages } = chat;

  // Realizando a conclusão do chat usando a API do OpenAI.
  const chatCompletion = await openai(key).chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
  // Extraindo a mensagem completada.
  const message = chatCompletion.choices[0].message;

  // Inicializando a nova título do chat.
  let newTitle = chat.title;

  // Verificando se o título do chat é "New Chat".
  if (chat.title === "New Chat") {
    // Se for, completando o título usando a API do OpenAI.
    const chatCompletionTitle = await openai(key).chat.completions.create({
      messages: [
        ...messages,
        message,
        {
          role: "user",
          content: "Return a title with 25 characters to the chat above",
        },
      ],
      model: "gpt-3.5-turbo",
    });
    // Extraindo o novo título completado.
    newTitle = chatCompletionTitle.choices[0].message.content;
  }

  // Retornando a resposta da requisição com o novo título e a mensagem completada.
  return NextResponse.json(
    { ...chat, title: newTitle, messages: messages.concat(message) },
    { status: HttpStatusCode.Ok }
  );
}
