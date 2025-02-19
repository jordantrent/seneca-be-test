FROM node:18 AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env

RUN npx prisma generate

RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/src/server.js"]