const express=require('express');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const knex=require('knex');
const bcrypt=require('bcrypt');

const {handleSignUp} = require('./controllers/signUp');
const {handleLogIn} = require('./controllers/logIn');
const {handleTransactionList} = require('./controllers/transactionList');

const app=express();

//Middleware for express app
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//database connection using knex
const db= knex ({
  client: 'mysql2',
  connection: {
    host: 'mysql_server',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'transaction_app'
  }
});

//Middleware for authentication using JWT token
//This middleware determines where the user can access the transaction list
const auth=(req, res, next)=>{
  let accessToken=req.headers['authorization'];
  jwt.verify(accessToken, 'access', (err,user)=>{
    if(!err){
      req.user=user;
      next();
    }
    else{
      return res.status(403).json("Invalid token");
    }
  });
};

app.get('/', (req, res) => {
  res.send('App is running')
});

app.post('/signUp', (req, res) => {handleSignUp(req,res,db,bcrypt,jwt)});
app.post('/login', (req, res) => {handleLogIn(req,res,db,bcrypt,jwt)});
app.post('/transactionList', auth, (req, res) => {handleTransactionList(req,res,db)});

app.listen(3000, () =>{
  console.log('Server started on port 3000');
});