const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;

const user = require('./user.js');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('Server works');
});

// Check the request
// const checkUserToken = (req, res, next) => {
//   if (!req.header('Authorization')) {
//     return res.status(401).json({
//       success: false,
//       message: 'Missing authentication header'
//     });
//   }
//   const token = req.header('authorization').split(' ')[1];
//   jwt.verify(token, secret);
//   next();
// };

app.post('/login', urlencodedParser, user.login);

app.post('/register', urlencodedParser, user.register);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
