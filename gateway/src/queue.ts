import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://redis:6379');
export const repoQueue = new Queue('repo-scraper', { connection });
