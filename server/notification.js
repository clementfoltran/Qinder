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

exports.newNotification = (id_user,  id_user_, notif) => {
  const sql = 'INSERT INTO notification VALUES(id_notif, ?, ?, NOW(), ?)';
  let query = db.format(sql, [id_user_, notif, id_user]);
  db.query(query, (err) => {
    if (err) {
      return (false);
    }
  });
  return (true);
}