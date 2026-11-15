import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { RepoScraperJobPayload } from '@kavach/contracts';
import { config } from './config';

export function createScraperWorker(): Worker<RepoScraperJobPayload> {
  const connection = new IORedis(config.redisUrl, {
    maxRetriesPerRequest: null,
  });

  const worker = new Worker<RepoScraperJobPayload>(
    'repo-scraper',
    async (job: Job<RepoScraperJobPayload>) => {
      const { projectId, githubUrl } = job.data;
      console.log(`[scraper] received job ${job.id} for project ${projectId} (${githubUrl})`);

      // Stub: full cloning and analysis handoff implemented in ticket 08
      console.log(`[scraper] job ${job.id} acknowledged — full implementation in ticket 08`);
    },
    { connection },
  );

  worker.on('completed', (job) => {
    console.log(`[scraper] job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[scraper] job ${job?.id} failed:`, err.message);
  });

  return worker;
}
