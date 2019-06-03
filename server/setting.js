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

exports.updateInfos = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      if (req.body.firstname && req.body.lastname) {
        let sql = 'UPDATE user SET firstname = ?, lastname = ? WHERE id_user = ?';
        let query = db.format(sql, [
          req.body.firstname,
          req.body.lastname,
          req.params.id
        ]);
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
          }
          res.send(response);
        });
      } else {
        // let sql = 'UPDATE user SET email = ?, notifMatch = ?, notifLike = ?, notifMessage = ?, hash = ? WHERE id_user = ?';
        // const hash = passwordHash.generate(req.body.password);
        // let query = db.format(sql, [
        //   req.body.firstname,
        //   req.body.lastname,
        //   req.body.email,
        //   hash,
        // ]);
        // db.query(query, (err, response) => {
        //   if (err) {
        //     console.log(err);
        //     // Todo return ;
        //   }
        //   res.send(response);
        // });
      }
    } else {
      res.sendStatus(401);
    }
  }
};
