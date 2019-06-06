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
            id: response[0].id_tag,
            tag: response[0].tag,
            label: response[0].label,
            logo: response[0].photo,
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};
