FROM node:20-alpine

WORKDIR /app

COPY services/ticketing/package.json ./package.json
RUN npm install --omit=dev

COPY services/ticketing/src ./src

EXPOSE 3001
CMD ["npm", "start"]
