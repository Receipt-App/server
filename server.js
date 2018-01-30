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



///users/receipts or receipts??????????????????????????????????????????????



app.get('/users/allusers', function(req, res) {
    client.query('SELECT * FROM  users;')
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
  });





app.get('/users/receipts', function(req, res) {
  client.query(`SELECT * FROM receipts WHERE username = ${req.body};`)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.post('/users/receipts', function(req, res) {
  client.query(
    `INSERT INTO users (username, receipt)
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

app.post('/users', function(req, res) {
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
  receiptTable();

 
  
  function receiptTable() {
    client.query(`
      CREATE TABLE IF NOT EXISTS receipts(
        id PRIMARY KEY,
        username VARCHAR(256),
        receipt TEXT NOT NULL
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