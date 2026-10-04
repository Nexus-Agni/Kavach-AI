# Architecture Constraints

- **Docker-First:** Every service must be fully containerized. A single `docker compose up` at the repository root must spin up the entire system. Never build local-only implementations. Whenever creating a new service or app, immediately write its `Dockerfile` and add it to `docker-compose.yml`.

- DO NOT DO GIT ADD, COMMIT or PUSH until the code-review is done and it is manually apporved by me. Always ask me "Is the manual testing done" before doing any of the git add, commit or push stuff. Also mention me the expected outcomes of that particular ticket which I should verify via manual testing. 

- Always use the LTS latest version of any framework or library and follow its read its latest documentation. Do not trust your pre-trained information blindly because that may have changed overtime. Use your web search tool and fetch and read the latest documentations. 