 Microservices Docker Project

Multi-stage Docker builds for payment, user, and notification microservices with Azure ACR and GitHub Actions CI/CD.

## Quick Start

### Prerequisites (macOS with Homebrew)
- Docker Desktop
- Node.js 20
- Azure CLI
- Git

### Local Development

```bash
# Install dependencies for each service
cd payment-service && npm install
cd ../user-service && npm install
cd ../notification-service && npm install

# Start services with Docker Compose
docker-compose up -d

# Test endpoints
curl http://localhost:3001/health
curl http://localhost:3002/health
curl http://localhost:3003/health
```

### Deploy to Azure

See DEPLOYMENT.md for detailed instructions.

## Architecture

- **Payment Service** (Port 3001): Payment processing
- **User Service** (Port 3002): User management
- **Notification Service** (Port 3003): Notification sending
- **Azure Container Registry**: Image storage and scanning
- **GitHub Actions**: CI/CD automation

