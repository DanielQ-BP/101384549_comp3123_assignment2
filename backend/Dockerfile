FROM node:18-alpine
WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --only=production || npm install --production

COPY backend/src ./src
COPY backend/.env ./

RUN mkdir -p /app/src/uploads

EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "src/server.js"]
