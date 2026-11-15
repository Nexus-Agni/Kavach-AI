import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { RepoScraperJobPayload } from '@kavach/contracts';

const connection = new IORedis(process.env.REDIS_URL || 'redis://redis:6379', {
  maxRetriesPerRequest: null,
});
export const repoQueue = new Queue<RepoScraperJobPayload>('repo-scraper', { connection });
