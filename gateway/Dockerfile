FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache openssl && npm install
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npx prisma generate && npx prisma db push && npm run dev"]
