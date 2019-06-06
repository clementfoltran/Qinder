const db = require('./database.js');
const passwordHash = require('password-hash');

// ENTER VIEW SETTINGS
// -----------------------------------------------------------------------------------------
exports.enterViewSetting = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT firstname, lastname, email, confirm, notifMatch, notifLike, notifMessage FROM user WHERE id_user = ?';
      const query = db.format(sql, [req.params.id]);
      console.log();
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'User not found',
          });
        } else {
          res.json({
            success: true,
            message: '',
            id_user: req.params.id,
            firstname: response[0].firstname,
            lastname: response[0].lastname,
            email: response[0].email,
            confirm: response[0].confirm,
            notifLike: response[0].notifLike,
            notifMatch: response[0].notifMatch,
            notifMessage: response[0].notifMessage,
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

// UPDATE NAME
// -----------------------------------------------------------------------------------------
exports.updateName = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.newFirstName || req.body.newLastName)
      {
        if (req.body.newFirstName && req.body.newLastName)
        {
          if (req.body.newFirstName.length > 1 && req.body.newLastName.length > 1)
          {
            let sql = 'UPDATE user SET firstname = ?, lastname = ? WHERE id_user = ?';
            const query = db.format(sql, [req.body.newFirstName, req.body.newLastName, req.body.idUser]);
          }
        }
        else if (req.body.newFirstName)
        {
          if (req.body.newFirstName.length > 1) 
          {
            let sql = 'UPDATE user SET firstname = ? WHERE id_user = ?';
            const query = db.format(sql, [req.body.newFirstName, req.body.idUser]);
          }
        } else if (req.body.newLastName)
        {
          if (req.body.newLastName.length > 1)
          {
            let sql = 'UPDATE user SET lastname = ? WHERE id_user = ?';
            var query = db.format(sql, [req.body.newLastName, req.body.idUser]);
          }
        }
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
          }
          res.json({
            message: '[BACK] YEAH USERNAME MODIFIED',
            success: true,
          });
        });
      } else {
        res.json({
          message: '[BACK] FAILED TO UPDATE USERNAME',
          success: true,
        });
      }
    } else {
      res.sendStatus(401);
    }
  }
};

// UPDATE EMAIL
// -----------------------------------------------------------------------------------------
exports.updateEmail = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (checkEmail(req.body.newEmail)) {
        let sql = 'UPDATE user SET email = ? WHERE id_user = ?';
        let query = db.format(sql, [
          req.body.newEmail,
          req.body.idUser
        ]);
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
          }
          res.json({
            message: '[BACK] YEAH EMAIL MODIFIED',
            success: true,
          });
        });
      } else {
        res.json({
          message: '[BACK] FAILED TO UPDATE EMAIL',
          success: true,
        });
      }
    } else {
      res.sendStatus(401);
    }
  }
};
function checkEmail(email)
{
  if (/^[a-z0-9\_\.\-]{2,20}\@[a-z0-9\_\-]{2,20}\.[a-z]{2,9}$/.test(email)) {
    return (1);
  } else {
    return (0)
  }
}

// UPDATE PASSWORD
// -----------------------------------------------------------------------------------------
exports.updatePassword = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (checkPassword(req.body.newPassword, req.body.newPasswordConfirmation)) {
        let sql = 'UPDATE user SET hash = ? WHERE id_user = ?';
        const hash = passwordHash.generate(req.body.newPassword);
        let query = db.format(sql, [
          hash,
          req.body.idUser
        ]);
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
          }
          res.json({
            message: '[BACK] YEAH PASSWORD MODIFIED',
            success: true,
          });
        });
      } else {
        res.json({
          message: '[BACK] FAILED TO UPDATE PASSWORD',
          success: true,
        });
      }
    } else {
      res.sendStatus(401);
    }
  }
};
function checkPassword(password, passwordConfirmation)
{
  if (password === passwordConfirmation)
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
