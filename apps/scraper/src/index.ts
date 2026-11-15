import { createScraperWorker } from './worker';

console.log('[scraper] starting repo-scraper service...');
const worker = createScraperWorker();

const handleShutdown = async () => {
  console.log('[scraper] shutting down...');
  await worker.close();
  process.exit(0);
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

console.log('[scraper] worker listening on repo-scraper queue');
