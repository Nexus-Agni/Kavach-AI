#!/bin/bash
set -e

echo "Syncing contracts to services..."

echo "Generating TypeScript types from JSON Schema..."
npx -y json-schema-to-typescript packages/contracts/report.schema.json -o packages/contracts/report.d.ts

echo "Syncing contracts to Gateway..."
mkdir -p apps/gateway/src/contracts
cp packages/contracts/report.schema.json apps/gateway/src/contracts/
cp packages/contracts/report.d.ts apps/gateway/src/contracts/
cp packages/contracts/schema.prisma apps/gateway/prisma/

# (Add other services like scraper and analysis engine as they are built)
echo "Contracts synced successfully."
