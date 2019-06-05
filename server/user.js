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
};

exports.register = (req, res) => {
  console.log(`register post ${req.body.email}`);
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (checkRegisterData(req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.passwordConfirmation)) {
        let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const hash = passwordHash.generate(req.body.password);
        let query = db.format(sql, [
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          hash,
          req.body.gender,
          new Date().toISOString().slice(0, 19).replace('T', ' '),
          null,
          null,
          null,
          1,
          null,
          null,
          1, 1, 1
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
      }
    } else {
      res.sendStatus(401);
    }
  }
};

function checkRegisterData(firstname, lastname, email, password, passwordConfirmation)
{
  if (firstname.length > 1 && lastname.length > 1)
  {
    if (/^[a-z0-9\_\.\-]{2,20}\@[a-z0-9\_\-]{2,20}\.[a-z]{2,9}$/.test(email))
    {
      if(password === passwordConfirmation)
      {
        var anUpperCase = /[A-Z]/;
        var aLowerCase = /[a-z]/; 
        var aNumber = /[0-9]/;
        var aSpecial = /[!|@|#|$|%|^|&|*|(|)|=|+|-|_]/;

        if (password.length >= 8)
        {
          var numUpper = 0;
          var numNums = 0;
          var numSpecials = 0;
          for (var i = 0; i < password.length; i++){
              if (anUpperCase.test(password[i]))
                  numUpper++;
              else if (aNumber.test(password[i]))
                  numNums++;
              else if (aSpecial.test(password[i]))
                  numSpecials++;
          }
          
          if (numUpper > 0 && numNums > 0 && numSpecials > 0)
          {
              return (1);
          }
        }
      }
    }
  }
}
