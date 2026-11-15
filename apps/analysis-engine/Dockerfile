FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@kavach/analysis-engine --docker

FROM python:3.11-slim AS runner
WORKDIR /app

# Install security updates and utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user per security requirements
RUN useradd -m -u 10001 kavach

# Copy pruned app source
COPY --from=builder /app/out/full/apps/analysis-engine/ /app/

# Install dependencies if present
RUN if [ -s requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

# Set ownership to non-root user
RUN chown -R kavach:kavach /app

USER kavach

ENV PORT=8000
EXPOSE 8000

CMD ["python3", "main.py"]
