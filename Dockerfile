# Multi-stage Dockerfile for micro-frontend-plantonize
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install native dependencies if needed
RUN apk add --no-cache git python3 make g++

# Copy package files and install
COPY package*.json ./
COPY scripts ./scripts
RUN npm ci --no-audit --prefer-offline

# Copy source (only necessary folders for angular build)
COPY angular.json tsconfig.json microfrontend.config.ts ./
COPY projects ./projects
COPY package.json .

# Build all projects using the existing npm script
RUN npm run build:all

# Production stage - serve with nginx
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built artifacts
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
