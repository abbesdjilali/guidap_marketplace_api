FROM node:latest
EXPOSE 3000
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY index.js /app/
CMD [ "npm", "start" ]