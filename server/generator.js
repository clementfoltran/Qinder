const db = require('./database.js');
const request = require('request');
const passwordHash = require('password-hash'); 

async function randomTags(idUser) {
  const sql = 'INSERT INTO usertag VALUES(id_utag, ?, ?)';
  let rand = Math.floor(Math.random() * (+7 - +1) + +1);
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
    await db.query(query, (err) => {
      if (err) throw err;
    });
  }
}

exports.randomUser = async (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    // for (let index; index < 1000; index++) {
      await request('https://randomuser.me/api/', { json: true }, async (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Failed to retrieve randomuser' });
        } else {
          if (res) {
            let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            let index = response.body.results[0];
            const position = {
              latitude: Math.random() * (+50 - +48) + +48,
              longitude: Math.random() * (+4 - +1) + +1,
            }
            let query = db.format(sql, [
              index.name.first,
              index.name.last,
              index.email,
              passwordHash.generate('clemclem'),
              index.gender.charAt(0).toUpperCase() + index.gender.slice(1),
              new Date(index.dob.date),
              (index.gender === 'male') ? 'Female' : 'Male',
              null, 10, 18, 100, null, 1,
              Math.random() * (+100 - +1) + +1,
              JSON.stringify(position),
              false, null, 100
            ]);
            await db.query(query, async (err, response) => {
              if (err) {
                res.json({ success: false, message: 'Failed to add randomuser' });
                throw err;
              } else {
                const idUser = response.insertId;
                await request(`https://source.unsplash.com/random/?$${ index.gender }`, { json: true }, async (err, response) => {
                  sql = 'INSERT INTO photo VALUES(id_photo, ?, ?, 0, NOW())';
                  const photoUrl = response.request.uri.href;
                  query = db.format(sql, [
                    idUser,
                    photoUrl
                  ]);
                  await db.query(query, async (err) => {
                    if (err) {
                      res.json({ success: false, message: 'Failed to add randomuser' });
                      throw err;
                    } else {
                      await randomTags(idUser);
                      res.json({ success: true, message: '', data: index, photoUrl: photoUrl });
                    }
                  });
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