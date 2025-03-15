FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml .
RUN corepack prepare pnpm --activate
RUN pnpm install
COPY . .

CMD ["pnpm", "tsx", "src/index.ts"]
