import { readFile } from "node:fs/promises";
import { openai, supabase } from "./config.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/*
  Challenge: Text Splitters, Embeddings, and Vector Databases!
    1. Use LangChain to split the content in movies.txt into smaller chunks.
    2. Use OpenAI's Embedding model to create an embedding for each chunk.
    3. Insert all text chunks and their corresponding embedding
       into a Supabase database table.
 */

createAndStoreEmbeddings();

/* Split movies.txt into text chunks.
Return LangChain's "output" – the array of Document objects. */
async function splitDocument(document) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 150,
    chunkOverlap: 50,
  });
  const output = await splitter.createDocuments([document]);
  console.log("Document splitted successfully.", output.length);
  return output;
}

/* Create an embedding from each text chunk.
Store all embeddings and corresponding text in Supabase. */
async function createAndStoreEmbeddings() {
  const movies = await readFile("movies.txt", {
    encoding: "utf-8",
  });
  console.log("Loaded movies file", movies.length);

  const chunkData = await splitDocument(movies);

  const embeddings = await Promise.all(
    chunkData.map(async (chunk) => {
      const { data } = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: chunk.pageContent,
      });
      return {
        content: chunk,
        embedding: data.at(0).embedding,
      };
    }),
  );
  console.log("Embeddings generated successfully.", embeddings.length);

  await supabase.from("document").insert(embeddings);
  console.log("Embeddings stored successfully.");
}
