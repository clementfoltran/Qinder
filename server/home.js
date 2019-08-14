const db = require('./database.js');
const notification = require('./notification.js');

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
            position: JSON.parse(response[0].position),
            confirm: response[0].confirm,
            online: response[0].online,
            lastConnection: response[0].last_connected
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
      // To calculate birthdate of users
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const minAge = currentYear - req.body.minage;
      const maxAge = currentYear - req.body.maxage;
      let sql = '';
      let query;
      if (req.body.interest === 'Both') {
        // ADD DISTANCE CHECK
        sql = 'SELECT user.id_user, firstname, bio, position, YEAR(birthdate) AS year FROM user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched) \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? LIMIT 1';
        query = db.format(sql, [
          req.body.id,
          maxAge,
          minAge
        ]);
      } else {
        sql = 'SELECT user.id_user, firstname, bio, position, YEAR(birthdate) AS year FROM user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched) \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? \
        AND user.gender = ? LIMIT 1';
        query = db.format(sql, [
          req.body.id,
          maxAge,
          minAge,
          req.body.interest,
        ]);
      }
      db.query(query, (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: false, message: 'User not found' });
        } else {
          if (response[0]) {
            res.json({
              success: true,
              message: '',
              id: response[0].id_user,
              firstname: response[0].firstname,
              bio: response[0].bio,
              position: JSON.parse(response[0].position),
              year: response[0].year
            });
          } else {
            res.json({ success: false, message: 'There is no more Qinders, try to change your parameters' });
          }
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getTheHeavens = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      // To calculate birthdate of users
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const minAge = currentYear - req.body.minage;
      const maxAge = currentYear - req.body.maxage;
      let sql = '';
      let query;
      if (req.body.interest === 'Both') {
        // ADD DISTANCE CHECK
    

        // sql = 'SELECT user.id_user, firstname, bio, position, YEAR(birthdate) AS year FROM user \
        // WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched) \
        // AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? ORDER BY RAND() LIMIT 20';

        sql = 'SELECT user.id_user, firstname, photo FROM user INNER JOIN photo ON user.id_user = photo.id_user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched)  \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? ORDER BY RAND() LIMIT 20';
        query = db.format(sql, [
          req.body.id,
          maxAge,
          minAge
        ]);
      } else {
        // sql = 'SELECT user.id_user, firstname, bio, position, YEAR(birthdate) AS year FROM user \
        // WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched) \
        // AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? \
        // AND user.gender = ? ORDER BY RAND() LIMIT 20';

        sql = 'SELECT user.id_user, firstname, photo FROM user INNER JOIN photo ON user.id_user = photo.id_user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched)  \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? AND user.gender = ? ORDER BY RAND() LIMIT 20';
        query = db.format(sql, [
          req.body.id,
          maxAge,
          minAge,
          req.body.interest,
        ]);
      }
      db.query(query, (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: false, message: 'User not found' });
        } else {
          if (response[0]) {
            res.json({
              success: true,
              message: '',
              people_list: response,
            });
          } else {
            res.json({ success: false, message: 'There is no more Qinders, try to change your parameters' });
          }
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.swipe = async (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'INSERT INTO swipe VALUES(id_swipe, ?, ?, ?, NULL)';
      let query = db.format(sql, [ req.body.id_user, req.body.id_user_, req.body.like ]);
      await db.query(query, (err) => {
        console.log(req.body.like);
        if (err) {
          throw err
        } else if (req.body.like) {
          sql = 'SELECT id_user FROM swipe WHERE id_user = ? AND id_user_matched = ? AND swipe.like = 1';
          query = db.format(sql, [ req.body.id_user_, req.body.id_user ]);
          db.query(query, (err, response) => {
            if (err) throw err;
            else if (response[0]) {
              console.log(response[0].id_user);
              const insertMatch = 'INSERT INTO `match` VALUES(id_match, NOW())';
              query = db.format(insertMatch);
              db.query(query, (err, response) => {
                if (err) throw err
                else {
                  const updateSwipe = 'UPDATE swipe SET id_match = ? WHERE id_user = ? AND id_user_matched = ?; \
                                       UPDATE swipe SET id_match = ? WHERE id_user = ? AND id_user_matched = ?;';
                  query = db.format(updateSwipe, [ response.insertId, req.body.id_user, req.body.id_user_,
                                                   response.insertId, req.body.id_user_, req.body.id_user, ]);
                  db.query(query, (err) => {
                    if (err) throw err;
                    else
                      res.json({ success: true, message: '', match: true });
                  });
                }
              });
            } else {
              res.json({ success: true, message: '', match: false });
            }
          });
        } else {
          res.json({ success: true, message: '', match: false });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getUserOnline = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'UPDATE user SET online = ? WHERE id_user = ?';
      const query = db.format(sql, [req.body.online, req.body.userId]);
      db.query(query, (err) => {
        if (err) {
          res.json({
            success: false,
            message: 'Could not update "online"',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully updated online'
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.saveUserLastConnection = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'UPDATE user SET last_connected = ? WHERE id_user = ?';
      const query = db.format(sql, [req.body.date, req.body.userId]);
      db.query(query, (err) => {
        if (err) {
          res.json({
            success: false,
            message: 'Could not not save last connection',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully saved last connection'
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};
