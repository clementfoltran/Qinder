const app = require('express')();
const bodyParser = require('body-parser');
const port = 8000;

// SOCKET.IO
var http = require('http').Server(app);
var http2 = require('http').Server(app);
var http3 = require('http').Server(app);
var io = require('socket.io')(http2);
var socketNotif = require('socket.io')(http3);

http.listen(8000, function(){
  console.log('listening on *:8000');
});
http2.listen(3000, function(){
  console.log('listening on *:3000');
});
http3.listen(3001, function(){
  console.log('listening on *:3001');
});

const user = require('./user.js');
const setting = require('./setting.js');
const home = require('./home.js');
const activate = require('./activate.js');
const preference = require('./preference.js');
const chat = require('./chat.js');
const notification = require('./notification.js');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// SOCKET.IO
io.on('connection', (socket) => {
  // console.log('a user connected');
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
  socket.on('chat message', (obj) => {
    // console.log('message reçu = ', obj);
    io.emit('chat message', obj);
  });
});

socketNotif.on('connection', (socket) => {
  // console.log('a user connected');
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
  socket.on('Notifications', (obj) => {
    // console.log('message reçu = ', obj);
    io.emit('Notifications', obj);
  });
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

// POST routes
app.post('/login', urlencodedParser, user.login);
app.post('/updateGeolocation', urlencodedParser, user.updateGeolocation);
app.post('/register', urlencodedParser, user.register);
app.post('/sendmail', urlencodedParser, user.sendMail);

app.get('/test/:id', urlencodedParser, user.test);

app.post('/updateName', urlencodedParser, setting.updateName);
app.post('/updateEmail', urlencodedParser, setting.updateEmail);
app.post('/updatePassword', urlencodedParser, setting.updatePassword);

app.post('/addUserTag', urlencodedParser, preference.addUserTag);
app.post('/updatePreferences', urlencodedParser, preference.updatePreferences);
app.post('/uploadPhoto', urlencodedParser, preference.uploadPhoto);
app.post('/deletePhoto', urlencodedParser, preference.deletePhoto);

app.post('/getUserToSwipe/', urlencodedParser, home.getUserToSwipe);
app.post('/swipe/', urlencodedParser, home.swipe);

app.post('/saveMessage', urlencodedParser, chat.saveMessage);

// GET routes
app.get('/setting/:id', urlencodedParser, setting.enterViewSetting);
app.get('/activate/:email', urlencodedParser, activate.enterViewActivate);
app.get('/activateAccount/:email', urlencodedParser, activate.activateAccount);
app.get('/home/:id', urlencodedParser, home.enterViewHome);
app.get('/getUserPhotos/:id', urlencodedParser, user.getUserPhotos);

app.get('/chat/:id', urlencodedParser, chat.loadMatches);
app.get('/loadConversation/:id', urlencodedParser, chat.loadConversation);

app.get('/getTags', urlencodedParser, preference.getTags);

app.get('/getProfilePhoto/:id', urlencodedParser, user.getProfilePhoto);

app.get('/getNotifications/:id', urlencodedParser, notification.getNotifications);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });