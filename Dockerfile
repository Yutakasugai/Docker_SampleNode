FROM node:18 as node-app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . ./

ENV PORT 4000

EXPOSE $PORT

FROM mysql:latest as node-mysql

CMD [ "npm", "run", "dev" ]

