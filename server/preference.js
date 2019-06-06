const db = require('./database.js');

exports.getTags = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT * from tag';
      db.query(sql, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'User not found',
          });
        } else {
          res.json({
            success: true,
            message: '',
            tags: response
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.addUserTag = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO usertag VALUE(id_utag, ?, ?)';
      const query = db.query(sql, [
        req.body.id_tag,
        req.body.id_user
      ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'Tag not found',
          });
        } else {
          res.json({
            success: true,
            message: '',
            tags: response
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

