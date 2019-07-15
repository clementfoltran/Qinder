const db = require('./database.js');
const request = require('request');

async function randomTags(idUser) {
  const sql = 'INSERT INTO usertag VALUES(id_utag, ?, ?)';
  let rand = Math.floor(Math.random() * (+7 - +3 + +3));
  let userTags = [];
  for (let i = 0; i < rand; i++) {
    randTag = Math.floor(Math.random() * (+7 - +1) + +1);
    for (let index; index < userTags.length; index++) {
      if (randTag === userTags[i]) {
        randTag = Math.floor(Math.random() * (+7 - +1) + +1);
      }
    }
    userTags.push(randomTags);
    const query = db.format(sql, [
      randTag,
      idUser
    ]);
    await db.query(query, (err, response) => {

    });
  }
}

exports.randomUser = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    // for (let index; index < 1000; index++) {
      request('https://randomuser.me/api/', { json: true }, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Failed to retrieve randomuser' });
        } else {
          if (res) {
            let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            let index = response.body.results[0];
            const position = {
              latitude: index.location.coordinates.latitude,
              longitude: index.location.coordinates.longitude
            }
            let query = db.format(sql, [
              index.name.first,
              index.name.last,
              index.email,
              index.login.sha1,
              index.gender.charAt(0).toUpperCase() + index.gender.slice(1),
              index.dob.date,
              (index.gender === 'male') ? 'Female' : 'Male',
              null, null, null, null, null, 1, null,
              JSON.stringify(position),
            ]);
            db.query(query, (err, response) => {
              if (err) {
                res.json({ success: false, message: 'Failed to add randomuser' });
              } else {
                const idUser = response.insertId;
                sql = 'INSERT INTO photo VALUES(id_photo, ?, ?, 0, NOW())'
                query = db.format(sql, [
                  idUser,
                  index.picture.large
                ]);
                db.query(query, (err, response) => {
                  console.log(response);
                  if (err) {
                    res.json({ success: false, message: 'Failed to add randomuser' });
                  } else {
                    randomTags(idUser);
                    res.json({ success: true, message: '' });
                  }
                });
              }
            });
          } else {
            res.sendStatus(401);
          }
        }
      });
    // }
  }

};