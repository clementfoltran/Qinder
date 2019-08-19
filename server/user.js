const db = require('./database.js');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const nodemailer = require('nodemailer');

exports.removeMatch = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'DELETE FROM swipe WHERE id_match = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          sql = 'DELETE FROM `match` WHERE id_match = ?';
          query = db.format(sql, [req.params.id]);
          db.query(query, (err) => {
            if (err) {
              res.json({ success: false, message: 'Network error' });
            } else {
              res.json({ success: true, message: '' });
            }
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.reportUser = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'DELETE FROM swipe WHERE id_match = ?';
      let query = db.format(sql, [ req.body.id_match ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          sql = 'DELETE FROM `match` WHERE id_match = ?';
          query = db.format(sql, [req.body.id_match]);
          db.query(query, (err) => {
            if (err) {
              res.json({ success: false, message: 'Network error' });
            } else {
              sql = 'INSERT INTO report VALUES(id_report, ?, ?)';
              query = db.format(sql, [ req.body.id_user_, req.body.id_user ]);
              db.query(query, (err) => {
                if (err) {
                  console.log(req.body.id_user_, req.body.id_user);
                  console.log(err);
                  res.json({ success: false, message: 'Network error' });
                } else {
                  res.json({ success: true, message: '' });
                }
              });
            }
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.removeUserTag = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'DELETE FROM userTag WHERE id_utag = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '' });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.addUserTag = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO usertag VALUES(id_utag, ?, ?)';
      const query = db.format(sql, [ req.body.id_tag, req.body.id_user ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Tag not found' });
        } else {
          res.json({ success: true, message: '', id_utag: response.insertId });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getUserTags  = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT usertag.*, tag.label, tag.tag FROM usertag INNER JOIN tag ON usertag.id_tag = tag.id_tag WHERE id_user = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '', userTags: response });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.updateGeolocation = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'UPDATE user SET position = ? WHERE id_user = ?';
      const position = {
        latitude: req.body.latitude,
        longitude: req.body.longitude
      };
      let query = db.format(sql, [
        JSON.stringify(position),
        req.body.id_user
      ]);
      db.query(query, (err, response) => {
        console.log(response);
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '' });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.test = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT position FROM user WHERE id_user = ?';
      let query = db.format(sql, [req.params.id]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '', response: response });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getProfilePhoto = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT photo FROM photo WHERE id_user = ? AND active = 1';
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
            message: 'Upload photo',
            photo: response[0].photo,
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

exports.login = (req, res) => {
  if (req.body) {
    const password = req.body.password;
    const sql = "SELECT hash, id_user, confirm FROM user WHERE email LIKE ?";
    const query = db.format(sql, [req.body.email]);
    db.query(query, (err, response) => {
      const hash = response[0].hash;
      const confirm = response[0].confirm;
      if (err) {
        res.json({
          message: 'Cannot find user with this email address',
          success: false,
        });
      } else if (passwordHash.verify(password, hash) && confirm === 1) {
        const myToken = jwt.sign({
          iss: 'https://qinder.com',
          user: 'Clément',
          scope: 'user'
        }, secret);
        res.json({
          user_id: response[0].id_user,
          token: myToken,
          message: 'Successfully logged user',
          success: true,
        });
      } else {
        res.json({
          message: 'Wrong password',
          success: false,
        });
      }
    });
  }
};

exports.register = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      // Hash the password
      const hash = passwordHash.generate(req.body.password);
      let query = db.format(sql,
      [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        hash,
        req.body.gender,
        req.body.birthdate,
        'Both',
        null,
        10,
        18,
        25,
        req.body.key,
        false,
        null,
        null,
      ]);
      db.query(query, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: true,
            message: 'Check your mailbox to confirm your account',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

// MAIL
//----------------------------------------------
exports.sendMail = (req, res) => {
  if (res)
  {
    nodeMailerRegisterCall(req.body.firstname, req.body.email, req.body.key, info => {
      // res.send(info);
    });
    // res.json({
    //   message: 'Email sent!',
    //   success: true,
    // });
  }
}
exports.resetPassword = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'UPDATE user SET validation_key = ? WHERE email = ?';
      let query = db.format(sql,
        [
          req.body.key,
          req.body.email,
        ]);
      db.query(query, (err, response) => {
        console.log(err);
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: 'Successfully prepared to send password reset email' });
          if (req.body.function === 'sendMail') {
            nodeMailerResetPasswordCall(req.body.email, req.body.key, info => {
              // res.send(info);
            });
          }
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

async function nodeMailerRegisterCall(email, key, callback) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'percival.weimann@ethereal.email',
        pass: 'u8WQJRnehmNvx9dqAA'
    }
  });

  let info = await transporter.sendMail({ 
    from: '"Martin @ MATCHA" <martin@matcha.io>',
    to: email,
    subject: "Validate your MATCHA account :)",
    text: `Hello ${userName}! Please click the link below to activate your Matcha account: http://localhost:4200/activate/${email}/${key}`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  callback(info);
}

async function nodeMailerResetPasswordCall(email, key, callback) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'percival.weimann@ethereal.email',
        pass: 'u8WQJRnehmNvx9dqAA'
    }
  });

  let info = await transporter.sendMail({ 
    from: '"Martin @ MATCHA" <martin@matcha.io>',
    to: email,
    subject: "Reset your MATCHA password",
    text: `Please click this link to reset your Matcha password: http://localhost:4200/resetPassword/${email}/${key}`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  callback(info);
}
