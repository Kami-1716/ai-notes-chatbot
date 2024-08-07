import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY!);

export async function getEmbeddings(text: string) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  const result = await model.embedContent(text);
  const embedding = result.embedding;
  return embedding;
}

// import OpenAI from "openai";

// const openaiApi = process.env.OPENAI_API_KEY!;

// if (!openaiApi) {
//   throw new Error("OPENAI_API_KEY is required");
// }

// const openai = new OpenAI({
//   apiKey: openaiApi,
// });

// export default openai;

// // get embeddings function
// export async function getEmbeddings(text: string) {
//   try {
//     console.log("Getting embeddings for text:", text);
//     const response = await openai.embeddings.create({
//       model: "text-embedding-ada-002",
//       input: text,
//     });
//     const embedding = response.data[0].embedding;

//     return embedding;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to get embeddings");
//   }
// }
