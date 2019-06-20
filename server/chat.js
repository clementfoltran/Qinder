const db = require('./database.js');

exports.loadMatches = (req, res) => {
  if (!req.body) {
      res.sendStatus(500);
    } else {
      if (res) {
        const sql = 'SELECT matches_ids FROM user WHERE id_user = ?';
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
              message: 'Successfully loaded matches',
              matches_list: response[0].matches_ids,
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
}

exports.saveMessage = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO message VALUES(?,?,?,?,?)';
      let query = db.format(sql,
        [
          null,
          req.body.idUser,
          req.body.message,
          new Date().toISOString().slice(0, 19).replace('T', ' '),
          null
        ]);
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
            res.json({
              success: false,
              message: 'Failed to save this message',
            });
          } else {
            res.json({
              success: true,
              message: 'Successfully saved this message',
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
  
}