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

usersTable();
cardTable();


app.get('/users/allusers', function(req, res) {
    client.query('SELECT * FROM  allusers;')
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
  });





app.get('/users/cards', function(req, res) {
  client.query(`SELECT * FROM cards ;`)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

/// post 

app.post('/users/cards', bodyParser, function(req, res) {
  client.query(
    `INSERT INTO cards (username, name, email, phone, other)
    VALUES ($1, $2, $3, $4, $5);
    `,
    [
      req.body.username,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.other
    ]
  )
    .then(function(data) {
      res.send(console.log('insert complete'));
    })
    .catch(function(err) {
      console.error(err);
    });
});

app.post('/users/allusers', bodyParser, function(req, res) {
  client.query(
    `INSERT INTO allusers (name, email, username)
    VALUES ($1, $2, $3);
    `,
    [
      req.body.name,
      req.body.email,
      req.body.username      
    ]
  )
    .then(function(data) {
    res.send(console.log('insert complete'));
    })
    .catch(function(err) {
    console.error(err);
    });
});


 
  
  function cardTable() {
    client.query(`
      CREATE TABLE IF NOT EXISTS cards(
        id SERIAL PRIMARY KEY,
        username VARCHAR(256),
        email VARCHAR(256),
        phone VARCHAR(256),
        other TEXT NOT NULL
      );`
    )
}

  
  function usersTable() {
    client.query(`
      CREATE TABLE IF NOT EXISTS allusers(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        username TEXT NOT NULL
      );`
    )
}

app.listen(PORT, () => {
    console.log(PORT);
});