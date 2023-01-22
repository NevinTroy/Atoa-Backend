# Atoa-Backend-Submission
This project is the submission for the candidature of Aota Node.js intern by Nevin Mathews Kuruvilla.
## Introduction
This is a simple backend API built using Node.js, Express.js, MySQL and Docker.\
The API has three routes: /signUp, /logIn and /transactionList.\
The SQL queries have been built using the help of a query builder called [knex](https://knexjs.org/). 
### 1. /signUp:
This route creates new users using the fields: name, email, mobile, password and returns the id of the user along with the access and refresh tokens using JWT.\
The password is hashed using the Bcrypt algorithm with 10 salt rounds.
![image](/testcases/signin.PNG)
### 2. /logIn: 
This route recieves two fields in the request body: mobile and password.\
The route hashes the recieved password and checks it with the hashed password in the database.\
The client recieves two tokens: access and refresh tokens on successful authentication
![image](/testcases/login.PNG)
### 3. /transactionList
This route recieves the access token in the header as an authorization parameter.\
If verified, the route utilizes three query parameters: page, noOfItems and transactionID.\
If the transactionID is specified, the transaction with the specific ID is returned.\
If the transactionID is empty, the transactions in the specific page is returned using the page number and noOfItems per page.\
![image](/testcases/singleTransaction.PNG)
![image](/testcases/transactionlist.PNG)
## Install
This project requires [Docker](https://docs.docker.com/get-docker/) and [MySQL](https://www.mysql.com/) to run.\
Start Docker Desktop to ensure that the Docker Daemon process is running.

## Run
1. Run the SQL commands present in Schema.sql file using your MySQL shell or workbench using a connection port of **3307** which is using in the project.
2. Change the MYSQL_ROOT_PASSWORD in docker-compose.yaml to your system setting. (line 19)
3. Change the password field in the knex connection query in server.js. (line 27)
4. Run the following docker command in terminal to build the image and get the containers up and running:
  ```bash
    docker-compose -f docker-compose.yaml up -d
  ```
3. To tear down the running containers run:
```bash
  docker-compose -f docker-compose.yaml down
```
## Possible Caveats
1. The docker container access the MySQL 3306 port via the 3307 port due to the fact that MySQL server's default port is 3306 and cannot be run by Docker. So make sure the SQL queries are entered in 3307 connection. 
2. While testing the endpoints, there are chances that you may run into this error:
```bash
Error: connect ECONNREFUSED 127.0.0.1:42395
```
&emsp; This is due to the fact that, the root user in MySQL might be configured to connect only to localhost and not any other networks, hence the &emsp; Docker container won't be able to make a connection. To resolve this issue, follow the steps [here](https://github.com/stsvilik/wdio-docker-service/issues/78)
