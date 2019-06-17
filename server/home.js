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
        sql = 'SELECT user.id_user, firstname, bio, position, birthdate FROM user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched) \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? LIMIT 1';
        query = db.format(sql, [
          req.body.id,
          maxAge,
          minAge
        ]);
      } else {
        sql = 'SELECT user.id_user, firstname, bio, position, birthdate FROM user \
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
        console.log(response);
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
      const sql = 'INSERT INTO swipe VALUES(id_swipe, ?, ?, ?)';
      const query = db.format(sql, [
        req.body.id_user,
        req.body.id_user_,
        req.body.like
      ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'User not found',
          });
        } else {
          console.log(response);
          res.json({
            success: true,
            message: '',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

// exports.checkMatch = (req, res) => {
//   if (!req.body) {
//     res.sendStatus(500);
//   } else {
//     if (res) {
//       const sql = 'SELECT id_user, id_user_ FROM user WHERE id_user = ? AND id_user_ = ?';
//       const query = db.format(sql, [
//         req.body.id_user,
//         req.body.id_user_,
//       ]);
//       db.query(query, (err, response) => {
//         if (err) {
//           res.json({
//             success: false,
//             message: 'User not found',
//           });
//         } else {
//           console.log(response);
//         }
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   }
// };