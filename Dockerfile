FROM node:23-slim AS builder

WORKDIR /usr/src/app

# Install build dependencies for the 'midi' package
# This is necessary because 'midi' contains native C++ code
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libasound2-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY .device_info ./.device_info
COPY .env ./.env

RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production environment
FROM node:23-slim

WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y \
    libasound2 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.device_info ./.device_info
COPY --from=builder /usr/src/app/.env ./.env

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
