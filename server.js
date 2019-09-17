const express = require('express');
const app = express();
const db = require('./db');
const { Person, Places, Things } = db.models;

app.get('/api/person', async(req, res, next )=>{
  Person.findAll()
    .then(person => res.send(person))
    .catch(next);
})

app.get('/api/places', async(req, res, next )=>{
  Places.findAll()
    .then(place => res.send(place))
    .catch(next);
})

app.get('/api/things', async(req, res, next )=>{
  Things.findAll()
    .then(thing => res.send(thing))
    .catch(next);
})

db.syncAndSeed()
  .then (()=>{
    app.listen(3000, () => console.log('listening'))
  });
