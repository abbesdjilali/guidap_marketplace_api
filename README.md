### TO START APP WITH DOCKER AND DOCKER COMPOSE
Docker and docker-compose installed in your machine
And run docker-compose up --build

### TO START APP WITHOUT DOCKER
CREATE YOUR DATABASE IN YOUR MYSQL WITH SCRIPT /db/init.sql
AND RUN npm install to install the dependencies
AND RUN npm start 

### Environment variables
rename .env.example to .env

#### YOU NEED TO SET YOUR API KEY :
MAPBOX_ACCESS_TOKEN=your token access mapbox api
OPEN_WEATHER_API_KEY=your api key
JWT_ACCESS_TOKEN_SECRET=your secret key example: my-secret-key

#### API DOCUMENTATION
localhost:3000/api/docs

#### THE FILE OF OPEN API V3
you can see swagger.json in ./app/swagger.json

#### TO TEST the routes protected by a token you must create an account
send your request body localhost:3000/user/register (see doc /api/docs)
and sign in localhost:3000/user/login
you can see your accessToken
use that in request body Authorisation Bearer for access to protected route

#### EXAMPLE DE REQUETES 
You can see example of request in ./send.request.http file


### Container
  guidap_app  : localhost:3000
  guidap_phpmyadmin : localhost:3001 (sign in with your user "MYSQL_USER" and password "MYSQL_USER" defined in your file .env )
  guidap_mysql 

### If you want connect Mysql-workbench to container guidap_mysql
   execute docker inspect guidap_mysql
   copy ip address to your in the host 

