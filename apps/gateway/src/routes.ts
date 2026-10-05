import { Router } from 'express';
import { prisma } from '@kavach/db';
import { repoQueue } from './queue';

export const router = Router();

router.post('/projects', async (req, res) => {
  const { githubUrl, userId } = req.body;
  if (!githubUrl || typeof githubUrl !== 'string') {
    return res.status(400).json({ error: 'githubUrl is required and must be a string' });
  }
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId is required and must be a string' });
  }

  try {
    const project = await prisma.project.create({
      data: {
        githubUrl,
        userId,
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

    const firstReport = project.reports[0];

    await repoQueue.add('new_repo_job', {
      projectId: project.id,
      githubUrl: project.githubUrl,
      reportId: firstReport.id
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
