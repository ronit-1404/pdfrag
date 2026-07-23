import 'dotenv/config';
import { Worker } from 'bullmq';
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

let redisConnection;
const rawRedisUrl = process.env.REDIS_URL || process.env.REDIS;
if (rawRedisUrl) {
    try {
        let cleanUrl = rawRedisUrl;
        const match = rawRedisUrl.match(/(redis|rediss):\/\/[^\s"]+/);
        if (match) {
            cleanUrl = match[0];
        }

        const parsed = new URL(cleanUrl);
        const hasTls = rawRedisUrl.includes('--tls') || parsed.protocol === 'rediss:';
        
        redisConnection = {
            host: parsed.hostname,
            port: parseInt(parsed.port || '6379'),
            username: parsed.username || undefined,
            password: parsed.password || undefined,
            tls: hasTls ? {} : undefined
        };
        console.log(`Parsed Redis - Host: ${redisConnection.host}, Port: ${redisConnection.port}, TLS: ${!!redisConnection.tls}`);
    } catch (e) {
        console.error("Failed to parse Redis connection string:", e);
    }
}

if (!redisConnection) {
    redisConnection = {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD || undefined
    };
}

const worker = new Worker('fileuploadqueue', async (job) => {
    try {
        console.log(`Processing JOB ${job.id}:`, job.data);
        const data = typeof job.data === 'string' ? JSON.parse(job.data) : job.data;

        // pdf loading
        const loader = new PDFLoader(data.path);
        const pdfDocs = await loader.load();

        // chunk the pdf
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const splitDocs = await textSplitter.splitDocuments(pdfDocs);
        console.log(`Split document into ${splitDocs.length} chunks.`);

        // call the google gemini embedding model for every chunk
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: 'gemini-embedding-2',
            apiKey: process.env.GOOGLE_API_KEY
        });

        // store the chunk in qdrant db
        const vectorstore = await QdrantVectorStore.fromExistingCollection(embeddings, {
            url: process.env.QDRANT_URL || 'http://localhost:6333',
            apiKey: process.env.QDRANT_API_KEY || undefined,
            collectionName: process.env.QDRANT_COLLECTION || "langchainjs-testing"
        });

        await vectorstore.addDocuments(splitDocs);
        console.log(`Successfully added docs to vector store for job ${job.id}`);
    } catch (error) {
        console.error("Error processing job:", error);
        throw error;
    }
}, {
    concurrency: 100,
    connection: redisConnection
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err);
});