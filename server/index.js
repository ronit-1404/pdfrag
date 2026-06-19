import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import { Queue } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const queue = new Queue("fileuploadqueue", {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379')
    }
});

const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: 'gemini-embedding-2',
    apiKey: process.env.GOOGLE_API_KEY
});

const vectorstore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    collectionName: process.env.QDRANT_COLLECTION || "langchainjs-testing"
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
});

const upload = multer({ storage: storage });
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));

app.get('/', (req, res) => {
    return res.json({ status: 'working' });
});

app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
    await queue.add("file-ready", JSON.stringify({
        filename: req.file.originalname,
        destination: req.file.destination,
        path: req.file.path,
    }));
    return res.json({ message: 'uploaded successfully' });
});

app.get('/chat', async (req, res) => {
    try {
        const userquery = req.query.message;

        const retriever = vectorstore.asRetriever({
            k: 2,
        });

        const result = await retriever.invoke(userquery);

        const system_prompt = `
        you are helpfull ai assistant who answers the user query based on the available context from pdf file.
        Context:
        ${JSON.stringify(result)}
        `;

        const model = client.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: system_prompt,
        });

        const chatresult = await model.generateContent(userquery);
        const text = chatresult.response.text();

        return res.json({
            message: text,
            docs: result,
        });
    } catch (error) {
        console.error("Error in /chat:", error);
        return res.status(500).json({ error: error.message });
    }
});

const PORT = parseInt(process.env.PORT || '8000');
app.listen(PORT, () => console.log(`server started on ${PORT}`));