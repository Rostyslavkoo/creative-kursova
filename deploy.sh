#!/bin/bash

# Load environment variables
source .env

# Build frontend
echo "Building frontend..."
cd client
npm install
npm run build
cd ..

# Deploy backend to Elastic Beanstalk
echo "Deploying backend..."
cd server
npm install
zip -r ../backend.zip .
cd ..

# Deploy frontend to S3
echo "Deploying frontend to S3..."
aws s3 sync client/dist s3://creative-kursova-frontend --delete

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "Deployment completed!" 