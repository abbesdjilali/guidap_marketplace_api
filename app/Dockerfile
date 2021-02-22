FROM node:latest
EXPOSE 8005
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY index.js /app/
CMD [ "npm", "start" ]