# OS
FROM node:bullseye
# Code
WORKDIR /bot
COPY ./ /bot/
# External dependencies (manual installation required)
RUN apt update -yq
# - for sqlite
RUN apt install -yq apt-transport-https ca-certificates sqlite3 python
# - for node-canvas
RUN apt install -yq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev 
# Installation dependencies
RUN npm ci
# Clean up
RUN apt clean -yq
# Default command
ENTRYPOINT npm run dev