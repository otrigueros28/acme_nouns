const express = require('express');
const app = express();
const db = require('./db');

db.syncAndSeed()
  .then (()=>{
    app.listen(3000, () => console.log('listening'))
  });
