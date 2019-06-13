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