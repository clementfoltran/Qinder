const db = require('./database.js');

exports.enterViewHome = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT * from user WHERE id_user = ?';
      const query = db.format(sql, [req.params.id]);
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
            id: response[0].id_user,
            firstname: response[0].firstname,
            lastname: response[0].lastname,
            bio: response[0].bio,
            distance: response[0].distance,
            minage: response[0].minage,
            maxage: response[0].maxage,
            interest: response[0].interest,
            gender: response[0].gender,
            confirm: response[0].confirm,
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getUserToSwipe = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql;
      if (req.body.interest === 'Both') {
        sql = 'SELECT u.* FROM user AS u INNER JOIN swipe AS s \
                      ON u.id_user != s.id_user \
                      WHERE u.id_user != ? AND u.id_user <= ? \
                      ';
      } else {
        sql = 'SELECT u.* FROM user AS u INNER JOIN swipe AS s \
                      ON u.id_user != s.id_user \
                      WHERE u.id_user != ? AND u.id_user <= ? AND gender = ?';
      }
      console.log(req.body.interest);
      const query = db.format(sql, [
        req.body.id,
        req.body.distance,
        req.body.interest,
      ]);
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
            return: response
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};