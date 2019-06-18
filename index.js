const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pokemon = require('./router')
const PORT = 3000;

// require dotenv
require('dotenv').config();

// details
const PROD_DB_USER = process.env.DB_USER;
const PROD_DB_PASS = process.env.DB_PASS;

// Defining the database env
const mongoURI = `mongodb+srv://${PROD_DB_USER}:${PROD_DB_PASS}@cluster0-preqb.mongodb.net/test?retryWrites=true&w=majority`;

// body parser
app.use(express.json());

// url encoded
app.use(express.urlencoded({extended : false}));

// connecting to the DB
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
  console.log("Connected to the database!");
}).catch((err) => {
  console.log("Error! Not connected to the Database! The error is:", err);
});


// get pokemon routes
app.use('/', pokemon)

// default route
app.get('/', (req, res) => {
  res.send("welcome to the api")
});

// instantiate server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
