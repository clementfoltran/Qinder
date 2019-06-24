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

exports.getMatchId = (req, res) => {
  if (!req.body) {
      res.sendStatus(500);
    } else {
      if (res) {
        const sql = 'SELECT match_id FROM `match` WHERE id_user = ? AND id_user_ = ?';
        const query = db.format(sql, [req.body.userId, req.body.userId_]);
        db.query(query, (err, response) => {
          if (err) {
            res.json({
              success: false,
              message: 'Could not get match_id for these users',
            });
          } else {
            res.json({
              success: true,
              message: 'Successfully found the match id for these users',
              matchId: response[0].match_id,
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
}

exports.loadConversation = (req, res) => {
  if (!req.body) {
      res.sendStatus(500);
    } else {
      if (res) {
        const sql = 'SELECT message, ts, id_user FROM `message` WHERE id_match = ?';
        const query = db.format(sql, 1); //[req.params.id]
        db.query(query, (err, response) => {
          if (err) {
            res.json({
              success: false,
              message: 'User not found',
            });
          } else {
            res.json({
              success: true,
              message: 'Successfully loaded conversation messages',
              messageArray: response[0]
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
          req.body.ts,
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