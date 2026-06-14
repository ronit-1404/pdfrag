import { Worker } from 'bullmq';

const worker = new Worker('fileuploadqueue', async (job) => {

    console.log(`JOB:`, job.data)
        console data = JSON.parse(job.data)
}, {
    concurrency: 100, connection: {
        host: 'localhost',
        port: '7379'
    }
});
