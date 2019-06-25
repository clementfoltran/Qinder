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
            bio: response[0].bio,
            position: response[0].position,
            year: response[0].year
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.swipe = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO swipe VALUES(id_swipe, ?, ?, ?, NULL)';
      const query = db.format(sql, [
        req.body.id_user,
        req.body.id_user_,
        req.body.like
      ]);
      db.query(query, (err) => {
        if (err) {
          res.json({
            success: false,
            message: 'User not found',
          });
        } else {
          if (req.body.like && checkMatch(req.body.id_user, req.body.id_user_)) {
            res.json({ success: true, message: '', match: true });
          } else {
            res.json({ success: true, message: '', match: false });
          }
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

const match = (id_user, id_user_matched) => {
  const insertMatch = 'INSERT INTO `match` VALUES(id_match, NOW())';
  let query = db.format(insertMatch);
  db.query(query, (err, response) => {
    console.log(response.insertId);
    if (err) {
      console.log(err);
      return (false);
    } else {
      const updateSwipe = 'UPDATE swipe SET id_match = ? WHERE id_user IN (?, ?)';
      query = db.format(updateSwipe, [ response.insertId, id_user, id_user_matched ]);
      db.query(query, (err, response) => {
        console.log(response);
        if (err) {
          console.log(err);
          return (false);
        } else {
          return (true);
        }
      });
    }
  });
}

const checkMatch = (id_user, id_user_) => {
  const sql = 'SELECT id_user FROM swipe WHERE id_user = ? AND id_user_matched = ? AND swipe.like = 1';
  const query = db.format(sql, [
    id_user,
    id_user_
  ]);
  db.query(query, (err, response) => {
    if (err) {
      console.log(err);
      return (false);
    } else if (response[0].id_user) {
      match(id_user, id_user_);
      return (true);
    } else {
      return (false);
    }
  });  
};