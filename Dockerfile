FROM node:17-slim

RUN apt-get update \
  && apt-get install -y sox libsox-fmt-mp3

WORKDIR /spotify-radio-js/

COPY package.json package-lock.json /spotify-radio-js/

RUN npm ci --silent

COPY . .

USER node

CMD npm run start:dev

  # libsox-fmt-all
