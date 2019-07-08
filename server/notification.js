const db = require('./database.js');

exports.getNotifications = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT notification.*, user.firstname, user.lastname FROM `notification` INNER JOIN user \
      ON notification.id_user_ = user.id_user WHERE notification.id_user = 2';
      let query = db.format(sql, req.params.id);
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
            notifications: response
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
}