#!/bin/sh

# Build and deploy script for Easypanel

echo "Starting deployment process..."

# Build Docker image
echo "Building Docker image..."
docker build -t agenda-oxum .

# Tag image for registry (if using a registry)
# docker tag agenda-oxum your-registry/agenda-oxum:latest

# Push to registry (if using a registry)
# echo "Pushing to registry..."
# docker push your-registry/agenda-oxum:latest

# Deploy using docker-compose
echo "Deploying application..."
docker-compose down
docker-compose up -d

echo "Deployment completed!"
echo "Application should be available at http://localhost"