const db = require('./database.js');

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

exports.updateName = (req, res) => {

  console.log('UPDATE NAME BACK');

  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.newFirstName && req.body.newLastName) {
        let sql = 'UPDATE user SET firstname = ?, lastname = ? WHERE id_user = ?';
        let query = db.format(sql, [
          req.body.newFirstName,
          req.body.newLastName,
          req.body.idUser
        ]);
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
