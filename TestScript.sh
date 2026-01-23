#!/bin/bash

echo "--Test Payment Service--"
curl http://localhost:3001/health
echo -e "\n"

curl -X POST http://localhost:3001/pay \
   -H "Content-Type: application/json" \
   -d '{"amount": 100, "currency": "USD", "customerId": "CUST001"}'

echo -e "\n --Test User Service--"

curl -X POST http://localhost:3002/users \
    -H "Content-Type: application/json" \
    -d '{"name": "John DOe", "email": "test@test.com", "phone": "+019876543210"}'

curl http://localhost:3002/users

echo -e "\n --Test Notification Service--"
curl -X POST http://localhost:3003/notifications \
    -H "Content-Type: application/json" \
    -d '{"userId": "USER-123", "type": "payment", "message": "Payment successful", "channel": "email"}'

curl http://localhost:3003/notifications


