#!/bin/bash

# Build and deploy script for Easypanel

echo "Starting deployment process..."

# Build Docker image
echo "Building Docker image..."
docker build -t atend-cliente-hub .

# Tag image for registry (if using a registry)
# docker tag atend-cliente-hub your-registry/atend-cliente-hub:latest

# Push to registry (if using a registry)
# echo "Pushing to registry..."
# docker push your-registry/atend-cliente-hub:latest

# Deploy using docker-compose
echo "Deploying application..."
docker-compose down
docker-compose up -d

echo "Deployment completed!"
echo "Application should be available at http://localhost"