FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY services/gameplay/package.json ./services/gameplay/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm ci --omit=dev --workspace services/gameplay --include-workspace-root=false

COPY packages/shared ./packages/shared
COPY services/gameplay/src ./services/gameplay/src
COPY services/gameplay/migrations ./services/gameplay/migrations

WORKDIR /app/services/gameplay

EXPOSE 3002
CMD ["npm", "start"]
