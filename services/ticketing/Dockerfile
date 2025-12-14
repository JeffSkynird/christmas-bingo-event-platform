FROM node:20-alpine

WORKDIR /app

# Copy only manifests first for better layer caching
COPY package.json package-lock.json ./
COPY services/ticketing/package.json ./services/ticketing/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm ci --omit=dev --workspace services/ticketing --include-workspace-root=false

# Now bring in the actual sources
COPY packages/shared ./packages/shared
COPY services/ticketing/src ./services/ticketing/src
COPY services/ticketing/migrations ./services/ticketing/migrations

WORKDIR /app/services/ticketing

EXPOSE 3001
CMD ["npm", "start"]
