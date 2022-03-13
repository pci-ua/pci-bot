# OS
FROM node:alpine

# Code
WORKDIR /bot
COPY ./ /bot/

# Installation dependencies
RUN npm ci

# Default command
ENTRYPOINT npm start
