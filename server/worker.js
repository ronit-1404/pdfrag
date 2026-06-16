import { Worker } from 'bullmq';
import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { CharacterTextSplitter } from '@langchain/textsplitters';

const worker = new Worker('fileuploadqueue', async (job) => {
    console.log(`JOB:`, job.data)
    const data = JSON.parse(job.data)
    //path: data.path
    //read the pdf from path
    //chunk the pdf
    //call the open ai embedding model for every chunk
    // store the chunk in qdrant db

    //pdf loading
    const loader = new PDFLoader(data.path)
    const pdfDocs = await loader.load()

    const client = new QdrantClient({ url: 'http://localhost:6333' });
    const embedding = new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_APIKEY
    });
    console.log(pdfDocs)

    //chuking
    const textsplitter = new CharacterTextSplitter({
        chunkSize: 300,
        chunkOverlap: 0,
    })
    const texts = await textsplitter.splitDocuments(pdfDocs)
    console.log(texts)
}, {
    concurrency: 100, connection: {
        host: 'localhost',
        port: 6379
    }
});