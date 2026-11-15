export * from '../report';
import reportSchema from '../report.schema.json';
export { reportSchema };

export interface RepoScraperJobPayload {
  projectId: string;
  githubUrl: string;
  reportId: string;
}

