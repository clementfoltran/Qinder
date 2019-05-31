const db = require('./database.js');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

exports.login = (req, res) => {
  if (req.body) {
    const email = req.body.email;
    const password = req.body.password;
    const sql = "SELECT hash FROM user WHERE email LIKE ?";
    const query = db.format(sql, [email]);
    db.query(query, (err, response) => {
      if (err) {
        res.json({
          message: '',
          success: false,
        });
      } else if (passwordHash.verify(password, response[0].hash)) {
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
        res.json({
          message: 'Wrong password',
          success: false,
        });
      }
    });
  }
}

exports.register = (req, res) => {
  console.log(`register post ${req.body.email}`);
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      // Hash the password
      const hash = passwordHash.generate(req.body.password);
      let query = db.format(sql, [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        hash,
        req.body.gender,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
        null, null, null, null, null,
      ]);
      db.query(query, (err, response) => {
        if (err) {
          console.log(err);
          // Todo return ;
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
}
