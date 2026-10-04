import { Router } from 'express';
import { prisma } from './db';
import { repoQueue } from './queue';

export const router = Router();

router.post('/projects', async (req, res) => {
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

    const [firstReport] = project.reports;

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
