FROM alpine:latest
RUN apk add --update --no-cache nodejs  --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community" npm
RUN node --version
EXPOSE 3000
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
WORKDIR /app
COPY package.json /app/
COPY swagger.json /app/
RUN npm install
COPY . /app/