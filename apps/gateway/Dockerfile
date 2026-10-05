FROM node:22-alpine AS builder
# Set working directory
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@kavach/gateway --docker

FROM node:22-alpine AS installer
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY --from=builder /app/out/json/ .
RUN npm install

COPY --from=builder /app/out/full/ .
# Generate prisma client inside the db package
RUN cd packages/db && npx prisma generate
RUN npx turbo run build --filter=@kavach/gateway

FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=installer /app/ .

EXPOSE 3000
CMD ["sh", "-c", "npm run db:deploy --workspace=@kavach/db && npm start --workspace=@kavach/gateway"]
