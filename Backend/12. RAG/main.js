import "dotenv/config";
import fs from "fs";

import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone";

/* ---------------------------------------------
    Initialize Pinecone Client
---------------------------------------------- */
const pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    environment: "us-east1-gcp",
});

// Connect to the existing Pinecone index
const pineconeIndex = pineconeClient.Index("rag-demo");

/* ---------------------------------------------
    Initialize Embedding Model
---------------------------------------------- */
const embeddingModel = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed",
});

/* ---------------------------------------------
    STEP 1: Read PDF File
---------------------------------------------- */

// const pdfBuffer = fs.readFileSync("./story.pdf");

// const pdfParser = new PDFParse({
//     data: pdfBuffer,
// });

// const pdfContent = await pdfParser.getText();

/* ---------------------------------------------
    STEP 2: Split PDF into Small Chunks
---------------------------------------------- */

// const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 0,
// });

// const documentChunks = await textSplitter.splitText(pdfContent.text);

/* ---------------------------------------------
    STEP 3: Generate Embeddings
---------------------------------------------- */

// const embeddedChunks = await Promise.all(
//     documentChunks.map(async (chunk) => {
//         const embedding = await embeddingModel.embedQuery(chunk);

//         return {
//             text: chunk,
//             embedding,
//         };
//     })
// );

/* ---------------------------------------------
    STEP 4: Store Embeddings in Pinecone
---------------------------------------------- */

// const uploadResult = await pineconeIndex.upsert({
//     records: embeddedChunks.map((chunk, index) => ({
//         id: `doc-${index}`,
//         values: chunk.embedding,
//         metadata: {
//             text: chunk.text,
//         },
//     })),
// });

// console.log("Data uploaded successfully:", uploadResult);

/* ---------------------------------------------
    STEP 5: Convert User Query into Embedding
---------------------------------------------- */

const userQueryEmbedding = await embeddingModel.embedQuery(
    "How was the internship experience ?"
);

console.log(userQueryEmbedding);

/* ---------------------------------------------
    STEP 6: Perform Similarity Search
---------------------------------------------- */

const searchResult = await pineconeIndex.query({
    vector: userQueryEmbedding,
    topK: 3,
    includeMetadata: true,
});

console.log(JSON.stringify(searchResult));