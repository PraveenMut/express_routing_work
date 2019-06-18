const express = require('express');
const app = express.Router();
const Pokemon = require('./models/pokemon');
app.use(express.json());
app.use(express.urlencoded({extended : false}));

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

module.exports = router;