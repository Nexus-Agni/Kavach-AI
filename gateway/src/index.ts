import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const connection = new IORedis(process.env.REDIS_URL || 'redis://redis:6379');
const repoQueue = new Queue('repo-analysis', { connection });

app.get('/health', async (req, res) => {
  try {
    // Test DB connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    console.error('DB Connection Error:', error);
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

app.post('/projects', async (req, res) => {
  const { githubUrl } = req.body;
  if (!githubUrl || typeof githubUrl !== 'string') {
    return res.status(400).json({ error: 'githubUrl is required and must be a string' });
  }

  try {
    const project = await prisma.project.create({
      data: {
        githubUrl,
        status: 'PENDING',
        reports: {
          create: {
            status: 'PENDING'
          }
        }
      },
      include: {
        reports: true
      }
    });

    await repoQueue.add('new_repo_job', {
      projectId: project.id,
      githubUrl: project.githubUrl,
      reportId: project.reports[0].id
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
