import express from 'express';
import { prisma } from './db';
import { router as projectRoutes } from './routes';

const app = express();
app.use(express.json());

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

app.use(projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
