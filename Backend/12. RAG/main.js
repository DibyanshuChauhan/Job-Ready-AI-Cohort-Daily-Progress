import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";

let dataBuffer = fs.readFileSync("./story.pdf");

const parsePDF = new PDFParse({
    data: dataBuffer,
})

const data = await parsePDF.getText();

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 0,
})

const splitterData = await splitter.splitText(data.text);

console.log(splitterData);