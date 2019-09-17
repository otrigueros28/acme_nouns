const express = require('express');
const app = express();
const db = require('./db');
const { Person, Places, Things } = db.models;
const path = require('path');

app.get('/api/people', async(req, res, next )=>{
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

app.get('/', async (req, res, next )=>{
  try{
    res.sendFile(path.join(__dirname, './index.html'));
  }
  catch(ex){
    next(ex);
  }
})

db.syncAndSeed()
  .then (()=>{
    app.listen(3000, () => console.log('listening'))
  });
