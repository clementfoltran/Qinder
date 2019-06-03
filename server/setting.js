const db = require('./database.js');
const passwordHash = require('password-hash');

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

exports.updateNotifications = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.notifMatch || req.body.notifLike || req.body.notifMessage) {
        let sql = 'UPDATE user SET notifMatch = ?, notifLike = ?, notifMessage = ? WHERE id_user = ?';
        let query = db.format(sql, [
          req.body.notifMatch,
          req.body.notifLike,
          req.body.notifMessage,
          req.body.idUser
        ]);
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
          }
          res.json({
            message: '[BACK] YEAH NOTIFICATIONS PREFERENCES MODIFIED',
            success: true,
          });
        });
      } else {
        res.json({
          message: '[BACK] FAILED TO UPDATE NOTIFICATIONS PREFERENCES',
          success: true,
        });
      }
    } else {
      res.sendStatus(401);
    }
  }
};

exports.updateName = (req, res) => {
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

exports.updateEmail = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.newEmail) {
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

exports.updatePassword = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.newPassword === req.body.newPasswordConfirmation) {
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
