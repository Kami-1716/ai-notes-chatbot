import { noteIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbeddings } from "@/lib/openai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateText, OpenAIStream, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log(messages);

    const messagesTruncated = messages.slice(-6);

    const embeddings = await getEmbeddings(
      messagesTruncated.map((message: any) => message.content).join("\n")
    );
    const { userId } = auth();

    const vectorQueryResponse = await noteIndex.query({
      vector: embeddings.values,
      topK: 5,
      filter: {
        userId,
      },
    });

    const releventNote = await prisma.note.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match: any) => match.id),
        },
      },
    });

    const systemMessages = {
      role: "system",
      content:
        "You are an intelligent note taking app. You answer user's question based on their existing notes. " +
        "The relavent notes for this query are:\n" +
        releventNote
          .map((note) => `Title: ${note.title}\n\nContent: ${note.content}`)
          .join("\n\n"),
    };

    const conversationHistory = [systemMessages, ...messagesTruncated];

    const google = createGoogleGenerativeAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const model = google("models/gemini-1.5-pro-latest", {
      safetySettings: [
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_LOW_AND_ABOVE",
        },
      ],
    });

    console.log(systemMessages.content);

    const { text } = await generateText({
      model,
      prompt: systemMessages.content,
    });

    console.log(text);

    return new Response(
      JSON.stringify({
        messages: [
          ...conversationHistory,
          {
            role: "system",
            content: text,
          },
        ],
      })
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate text", { status: 500 });
  }
}
