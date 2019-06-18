const express = require('express');
const router = express.Router();

// require model schema
const Pokemon = require('./models/pokemon');


// getting all pokemon (R)
router.get('/pokemon', (req, res) => {
  Pokemon.find({}).then((foundPokemon) => {
    console.log(foundPokemon);
    return res.json(foundPokemon);
  }).catch( err => res.json(err))
});

router.get('/pokemon/:id', (req, res) => {
  const { id } = req.params;

  Pokemon.findOne({id: id}).then((poke) => {
    console.log(poke);
    return res.json(poke);
  }).catch( err => res.json(err) );
})

// posting single pokemon (C)
router.post('/pokemon', (req, res) => {
  const { id, name, height, moves, image } = req.body
  
  Pokemon.create({ id, name, height, moves, image }).then((newPokemon) => {
    return res.json(newPokemon);
  }).catch((err) => {
    return res.json(err);
  });
});

// updating pokemon (U)
router.put('/pokemon/:id', (req, res) => {
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
router.delete('/pokemon/:id', (req, res) => {
  const { id } = req.params;
  Pokemon.findOneAndDelete({id}).then((p) => {
    if(!p) return res.send("Pokemon not found");

    return res.send(`${p.name} has been deleted from the database`);
  }).catch((err) => {
    return res.json(err)
  })
})

module.exports = router;