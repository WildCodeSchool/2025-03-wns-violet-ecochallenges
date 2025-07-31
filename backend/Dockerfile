FROM node:lts-alpine
WORKDIR /app
RUN apk --no-cache add curl
COPY .env .env
COPY src src
COPY *.json .
RUN npm i

CMD npm run dev
