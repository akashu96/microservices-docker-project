FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:20-alpine AS runtime

LABEL maintainer="DevOps Team <devops@example.com>"
LABEL description="Notification Service Microservice"
LABEL version="1.0.0"

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/app.js ./

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs
EXPOSE 3003

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3003/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

ENV NODE_ENV=production
CMD ["node", "app.js"]