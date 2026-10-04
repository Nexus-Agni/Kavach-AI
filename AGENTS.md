# Architecture Constraints

- **Docker-First:** Every service must be fully containerized. A single `docker compose up` at the repository root must spin up the entire system. Never build local-only implementations. Whenever creating a new service or app, immediately write its `Dockerfile` and add it to `docker-compose.yml`.

- DO NOT DO GIT ADD, COMMIT or PUSH until the code-review is done and it is manually apporved by me. Always ask me "Is the manual testing done" before doing any of the git add, commit or push stuff. Also mention me the expected outcomes of that particular ticket which I should verify via manual testing. 

- Always use the LTS latest version of any framework or library and follow its read its latest documentation. Do not trust your pre-trained information blindly because that may have changed overtime. Use your web search tool and fetch and read the latest documentations. 

- **Source of Truth:** The `PID.md` document is the master reference for High-Level Design (HLD), Data Flow, Microservice Responsibilities, and the Technology Stack. **CRITICAL: You MUST read `PID.md` BEFORE planning any implementation or reviewing any ticket.** Always consult it when designing or implementing inter-service communication or creating new services to avoid documentation mismatch.
- **Inter-service Communication:** Follow the established architecture: 
  - Gateway to Scraper uses **BullMQ** (`repo-scraper` queue) for durability and backpressure.
  - Scraper to Analysis Engine uses **fire-and-forget HTTP requests**.
  - Analysis Engine to Gateway uses **webhook callbacks**.