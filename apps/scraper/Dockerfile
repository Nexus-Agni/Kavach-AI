FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@kavach/scraper --docker

FROM node:22-alpine AS installer
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat git
COPY --from=builder /app/out/json/ .
RUN npm install

COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=@kavach/scraper

FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl git
COPY --from=installer /app/ .

CMD ["npm", "start", "--workspace=@kavach/scraper"]
