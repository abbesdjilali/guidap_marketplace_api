FROM alpine
RUN apk update && apk add nodejs-npm
EXPOSE 3000
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
RUN npm install
COPY index.js /app/
CMD [ "npm", "start" ]