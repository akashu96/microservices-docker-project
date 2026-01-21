# Stage 1: Builder (Build and dependencies)

FROM node:20-apline AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Copy application source code
COPY . .

# Stage 2: Runtime (Production Image)

FROM node:20-apline AS runtime

#Set Metadata
LABEL maintainer="DevOps Team <devops@example.com>"
LABEL description="Payment microservice"
LABEL version="1.0.0"

WORKDIR /app

#Copy only built artifacts from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/app.js ./

#create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

#Switch to non-root user
USER nodejs

#Expose application port
EXPOSE 3001

#Health check (docker can monitor container health)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

#Set environment variables
ENV NODE_ENV=production

#Start application
CMD ["node", "app.js"]