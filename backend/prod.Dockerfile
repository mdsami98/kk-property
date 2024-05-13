FROM node:20-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@8.14.1 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5000

CMD [ "node", "src/index.js" ]
