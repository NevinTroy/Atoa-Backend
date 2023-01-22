# Atoa-Backend-Submission
This project is the submission for the candidature of Aota Node.js intern by Nevin Mathews Kuruvilla.
## Introduction
This is a simple backend API built using Node.js, Express.js, MySQL and Docker.\
The API has three routes:
### 1. /signup:
This route creates new users using the fields: name, email, mobile, password and returns the id of the user along with the access and refresh tokens using JWT.\
The password is hashed using the Bcrypt algorithm with 10 salt rounds.
![image](/testcases/signin.PNG)
### 2. /login: 
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
1. Run the SQL commands present in Schema.sql file using your MySQL shell or workbench
2. Run the following docker command in terminal to build the image and get the containers up and running:
  ```bash
    docker-compose -f docker-compose.yaml up -d
  ```
3. To tear down the running containers run:
```bash
  docker-compose -f docker-compose.yaml down
```
