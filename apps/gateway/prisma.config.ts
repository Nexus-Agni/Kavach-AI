import { config } from "dotenv";
import * as path from "path";

// Load the root .env file since we are running inside gateway/
config({ path: path.join(__dirname, "../../.env") });

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
