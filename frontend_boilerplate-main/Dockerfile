FROM node:lts-alpine

RUN mkdir /appfront
WORKDIR /appfront
COPY package*.json ./
RUN npm install
COPY next.config.js ./
COPY README.md ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY public public
COPY src src

CMD npm run dev