export const config = {
  redisUrl: process.env.REDIS_URL || 'redis://redis:6379',
  gatewayUrl: process.env.GATEWAY_URL || 'http://gateway:3000',
  analysisEngineUrl: process.env.ANALYSIS_ENGINE_URL || 'http://analysis-engine:8000',
  reposDir: process.env.REPOS_DIR || '/repos',
};
