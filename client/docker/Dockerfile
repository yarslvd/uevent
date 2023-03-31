FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY src ./src
COPY public ./public

COPY docker/package.json ./package.json
COPY docker/package-lock.json ./package-lock.json

RUN npm install
EXPOSE 3000

CMD [ "npm", "run", "start" ]