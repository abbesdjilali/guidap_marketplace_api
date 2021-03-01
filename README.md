### To start app you need
Docker and docker-compose installed in your machine

### Environment variables
rename .env.example to .env
#### YOU NEED TO SET YOUR API KEY :
#MAPBOX API KEY
MAPBOX_ACCESS_TOKEN=your token access mapbox api

#OPEN WEATHER API KEY
OPEN_WEATHER_API_KEY=your api key

### To run Guidap API
    docker-compose up --build

#### GENERATE JWT TOKEN
GO TO localhost:3000/user/register 
AND GO TO localhost:3000/user/login
you can see tour accessToken
use that in request body Authorisation Bearer

#### EXAMPLE DE REQUETES 
You can see example of request in ./send.request.http file

#### API DOCUMENTATION
localhost:3000/api/docs

#### THE FILE OF OPEN API V3
you can see swagger.json in ./app/swagger.json


### Container
    guidap_app  : localhost:3000
    guidap_phpmyadmin : localhost:3001
    guidap_mysql

### If you want connect Mysql-workbench to container guidap_mysql
    execute docker inspect guidap_mysql
    copy ip address to your in the host 


