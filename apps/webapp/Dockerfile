FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@kavach/webapp --docker

FROM node:22-alpine AS installer
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=builder /app/out/json/ .
RUN rm -f package-lock.json && npm install

COPY --from=builder /app/out/full/ .
RUN npm install -D @rolldown/binding-linux-arm64-musl || true
RUN npx turbo run build --filter=@kavach/webapp

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=installer /app/ .

EXPOSE 5173
CMD ["npm", "run", "dev", "--workspace=@kavach/webapp", "--", "--host"]
