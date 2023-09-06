# OS
FROM node:20-alpine

# Setup dependencies
WORKDIR /bot
COPY package.json /bot/
COPY package-lock.json /bot/
RUN npm ci

# Default command
ENTRYPOINT npm start
