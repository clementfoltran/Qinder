const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const port = 8000;
const db = mysql.createConnection({
  host      : 'localhost',
  user      : 'adm',
  password  : 'clemclem',
  database  : 'qinder'
});
const secret = "7hDwfF<k780-S0F9g0hj8yyt01-20fasvcxvbnmujrhnj";
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to database
db.connect((err) => {
  if (err) {
    console.log('Failed to connect to mysql database');
  }
  console.log('Successfully connect to qinder mysql database');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('Server works');
});

const fakeUser = { email: "cf@quinder.com", passwd: "asdf"};
app.post('/login', urlencodedParser, (req, res) => {
  console.log(`login post ${req.body}`);
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (fakeUser.email === req.body && fakeUser.passwd === req.body.passwd) {
      const myToken = jwt.sign({
        iss: 'https://qinder.com',
        user: 'Clément',
        scope: 'user'
      }, secret);
      res.json({token: myToken});
    } else {
      res.sendStatus(401);
    }
  }
});

app.post('/register', (req, res) => {
  console.log(`register post ${req.body.email}`);
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'INSERT INTO users VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      let query = db.format(sql, [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.gender,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
        null, null, null, null, null,
      ]);
      db.query(query, (err, response) => {
        if (err) {
          console.log(err);
          // return ;
        }
        res.send(response);
      });
      const myToken = jwt.sign({
        iss: 'https://qinder.com',
        user: 'Clément',
        scope: 'user'
      }, secret);
      res.json({
        token: myToken,
        message: '',
        success: true,
      });
    } else {
      res.sendStatus(401);
    }
  }
});

app.get('/getUsers', (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
