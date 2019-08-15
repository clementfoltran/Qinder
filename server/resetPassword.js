const db = require('./database.js');

exports.checkKey = (req, res) => {
    if (!req.body) {
        res.sendStatus(500);
      } else {
        if (res) {
          const sql = 'SELECT validation_key FROM user WHERE email = ?';
          const query = db.format(sql, [req.params.email]);
          db.query(query, (err, response) => {
            if (err) {
              res.json({
                success: false,
                message: 'User not found',
              });
            } else {
              console.log(response)
              res.json({
                success: true,
                message: 'User exists',
                key: response[0].validation_key,
              });
            }
          });
        } else {
          res.sendStatus(401);
        }
      }
  };
  
  // exports.activateAccount = (req, res) => {
  //   if (!req.body) {
  //     res.sendStatus(500);
  //   } else {
  //     if (res) {
  //       const sql = "UPDATE user SET confirm = ? WHERE email = ?";
  //       const query = db.format(sql, [1, req.params.email]);
  //       db.query(query, (err, response) => {
  //         if (err) {
  //           res.json({
  //             success: false,
  //             message: 'Failed to activate user account',
  //           });
  //         } else {
  //           res.json({
  //             success: true,
  //             message: 'Successfully activated user account',
  //           });
  //         }
  //       });
  //     } else {
  //       res.sendStatus(401);
  //     }
  //   }
  // };