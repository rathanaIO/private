FROM node:latest

WORKDIR /app

COPY . .

RUN yarn install

CMD yarn start

EXPOSE 3000 3000
