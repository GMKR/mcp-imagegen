FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml .
RUN corepack prepare pnpm --activate
COPY . .
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "start"]
