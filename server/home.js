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

exports.updatePreferences = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'UPDATE user SET bio = ?, gender = ?, interest = ?, distance = ?, minage = ?, maxage = ? WHERE id_user = ?';
      let query = db.format(sql, [
        req.body.bio,
        req.body.gender,
        req.body.interest,
        req.body.distance,
        req.body.minage,
        req.body.maxage,
        req.body.id
      ]);
      db.query(query, (err, response) => {
        console.log(response);
        if (err) {
          res.json({
            success: false,
            message: 'Network error',
          });
        } else {
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

exports.getUserPhotos = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT * FROM photo WHERE id_user = ?';
      let query = db.format(sql, [req.params.id]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'Network error',
          });
        } else {
          res.json({
            success: true,
            message: '',
            photos: response,
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.uploadPhoto = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO photo VALUES(id_photo, ?, ?, ?, ?)';
      let query = db.format(sql, [
        req.body.id,
        req.body.photo,
        req.body.active,
        req.body.ts
      ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'Network error',
            id: response[0].OkPacket.InsertId
          });
        } else {
          res.json({
            success: true,
            message: 'Upload photo',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};


exports.deletePhoto = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'DELETE FROM photo WHERE id_photo = ? AND id_user = ?';
      let query = db.format(sql, [
        req.body.id_photo,
        req.body.id_user,
      ]);
      db.query(query, (err, response) => {
        console.log(response);
        if (err) {
          res.json({
            success: false,
            message: 'Network error',
          });
        } else {
          res.json({
            success: true,
            message: 'Delete photo',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};
