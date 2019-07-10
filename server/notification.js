const db = require('./database.js');
const index = require('./app.js');
const app = index.app;
const http = require('http').Server(app);
const io = require('socket.io')(http);

const notifications = {};

io.on('connection', socket => {
  let previousId;
  const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
      previousId = currentId;
  }

  socket.on('addNotification', notif => {
    notifications[notif.id_user] = notif;
      safeJoin(notif.id_user);
      io.emit('notifications', Object.keys(notifications));
      socket.emit('document', notif);
  });

  socket.on('getNotifications', id => {
    safeJoin(id);
    socket.emit('notifications', notifications[id]);
    console.log(notifications[id]);
  });

  io.emit('notifications', Object.keys(notifications));

  console.log(`Socket ${socket.id} has connected`);
});

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

http.listen(3001, () => {
  console.log('listening on *:3001');
});