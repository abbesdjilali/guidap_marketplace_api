### To start app you need
Docker and docker-compose installed in your machine


### To run Guidap API
    docker-compose up

### Container
    Guidap_app  : localhost:3000
    Guidap_phpmyadmin : localhost:3001
    Guidap_mysql

### If you want connect Mysql-workbench to container guidap_mysql
    execute docker inspect guidap_mysql
    copy ip address to your workbench and 
    use port  : 3306  
    use user : guidap_user
    use password : guidap_pass

