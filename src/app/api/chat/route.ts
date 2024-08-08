import { noteIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbeddings } from "@/lib/openai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const messagesTruncated = messages.slice(-6);

    const embeddings = await getEmbeddings(
      messagesTruncated.map((message: any) => message.content).join("\n")
    );

    console.log(embeddings);
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

    console.log("Relavent Notes found", releventNote);

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

    const result = await streamText({
      model: google("models/gemini-pro"),
      messages: conversationHistory,
    });

    console.log(result.toDataStreamResponse());

    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate text", { status: 500 });
  }
}
