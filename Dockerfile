# OS
FROM node:bullseye
# Config
WORKDIR /bot
# External dependencies (manual installation required)
RUN apt update -yq
# - for sqlite
RUN apt install -yq apt-transport-https ca-certificates sqlite3 python
# - for node-canvas
RUN apt install -yq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev 
# Clean up
RUN apt clean -yq
# Installation dependencies
ADD package.json /bot/package.json
RUN npm i
# Code
COPY ./ /bot/
# Default command
ENTRYPOINT npm start