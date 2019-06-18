const express = require('express');
const app = express();
const mongoose = require('mongoose');
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

app.use('/pokemon', pokemon)

// connecting to the DB
// mongoose.connect(mongoURI, { useNewUrlParser: true }).then( console.log('connected to mongodb'));

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
  console.log("Connected to the database!");
}).catch((err) => {
  console.log("Error! Not connected to the Database! The error is:", err);
});

// require schema
const Pokemon = require('./models/pokemon');

app.get('/', (req, res) => {
  res.send("welcome to the api")
});


// getting all pokemon (R)
app.get('/pokemon', (req, res) => {
  Pokemon.find({}).then((foundPokemon) => {
    console.log(foundPokemon);
    return res.json(foundPokemon);
  }).catch( err => res.json(err))
});

app.get('/pokemon/:id', (req, res) => {
  const { id } = req.params;

  Pokemon.findOne({id: id}).then((poke) => {
    console.log(poke);
    return res.json(poke);
  }).catch( err => res.json(err) );
})

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

// posting single pokemon (C)
app.post('/pokemon', (req, res) => {
  const { id, name, height, moves, image } = req.body
  
  Pokemon.create({ id, name, height, moves, image }).then((newPokemon) => {
    return res.json(newPokemon);
  }).catch((err) => {
    return res.json(err);
  });
});

// updating pokemon (U)
app.put('/pokemon/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  console.log(name)
  Pokemon.findOne({id})
  .then( poke => {
    poke.name = name
    poke.save()
    .then( doc => res.send(`${doc.name} has been updated`))
    .catch( error => console.log(error) )
  })
  .catch( err => res.json(err))
  })
// })

// Deleting documents/records (D)
app.delete('/pokemon/:id', (req, res) => {
  const { id } = req.params;
  Pokemon.findOneAndDelete({id}).then((p) => {
    if(!p) return res.send("Pokemon not found");

    return res.send(`${p.name} has been deleted from the database`);
  }).catch((err) => {
    return res.json(err)
  })
})

