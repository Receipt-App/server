'use strict';

const cors = require('cors');
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser').urlencoded({extended: true});


const app = express();
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

app.use(cors());

///users/cards or cards??????????????????????????????????????????????



app.get('/users/allusers', function(req, res) {
    client.query('SELECT * FROM  users;')
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
  });





app.get('/users/cards', function(req, res) {
  client.query(`SELECT * FROM cards WHERE username = ${req.body};`)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.post('/users/cards', function(req, res) {
  client.query(
    `INSERT INTO users (username, card)
    VALUES ($1, $2);
    `,
    [
      req.body.username,
      req.body.reseipt,      
    ]
  )
    .then(function(data) {
      res.send('insert complete');
    })
    .catch(function(err) {
      console.error(err);
    });
});

app.post('/users/allusers', function(req, res) {
  client.query(
    `INSERT INTO users (name, email, username)
    VALUES ($1, $2, $3);
    `,
    [
      req.body.name,
      req.body.email,
      req.body.usernme,
      
    ]
  )
    .then(function(data) {
    res.send('insert complete');
    })
    .catch(function(err) {
    console.error(err);
    });
});

  usersTable();
  cardTable();

 
  
  function cardTable() {
    client.query(`
      CREATE TABLE IF NOT EXISTS cards(
        id PRIMARY KEY,
        username VARCHAR(256),
        card TEXT NOT NULL
      );`
    )
}

  
  function usersTable() {
    client.query(`
      CREATE TABLE IF NOT EXISTS allusers(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256),
        email VARCHAR(256),
        username VARCHAR(256)
      );`
    )
}

app.listen(PORT, () => {
    console.log(PORT);
});