import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY!;

if (!apiKey) {
  throw new Error("PINECONE_API_KEY is required");
}

const pc = new Pinecone({
  apiKey,
});

export const noteIndex = pc.Index("custom-ai-chatbot");
