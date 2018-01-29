'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyParser = require('body-parser').urlencoded({extended: true});


const app = express();
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();


app.use(cors());



app.get('/user', function(req, res) {
    client.query('SELECT * FROM user;')
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
  });

app.post('/user', function(req, res) {
client.query(
    `INSERT INTO user (receipt)
    VALUES ($1);
    `,
    [
    req.body.receipt,
    
    ]
)
    .then(function(data) {
    res.send('insert complete');
    })
    .catch(function(err) {
    console.error(err);
    });
});

  createTable();

 
  
  function createTable() {
    client.query(`
      CREATE TABLE IF NOT EXISTS user(
        id SERIAL PRIMARY KEY,
        receipt TEXT NOT NULL
      );`
    )
}

app.listen(PORT, () => {
    console.log(PORT);
});