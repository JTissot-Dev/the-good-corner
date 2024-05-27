FROM node:lts-alpine

RUN mkdir /appback
WORKDIR /appback
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY .gitignore ./
COPY http http
COPY src src

# RUN if [ "$APP_ENV" = "development" ]; then npm run migration:up; fi

CMD npm run start