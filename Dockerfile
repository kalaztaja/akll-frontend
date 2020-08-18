FROM node:lts-alpine as build-stage
ARG game
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Need to copy env variables to .env.production because vue-cli is piece of shit
RUN mv .env.${game} .env.production

RUN npm run build

RUN npm install -g http-server

EXPOSE 8080
CMD ["http-server", "dist"]
