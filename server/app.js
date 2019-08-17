const app = require('express')();
const bodyParser = require('body-parser');
const port = 8000;

// SOCKET.IO
let http = require('http').Server(app);

http.listen(8000, function() {
  console.log('listening on *:8000');
});

const user = require('./user.js');
const setting = require('./setting.js');
const home = require('./home.js');
const activate = require('./activate.js');
const preference = require('./preference.js');
const chat = require('./chat.js');
const notification = require('./notification.js');
const generator = require('./generator.js')
const resetPassword = require('./resetPassword.js')

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json({limit: '10mb', extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
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
app.post('/reportUser', urlencodedParser, user.reportUser);
app.post('/resetPassword', urlencodedParser, user.resetPassword);
app.post('/checkKey/:email', urlencodedParser, resetPassword.checkKey);
app.post('/saveNewPassword', urlencodedParser, resetPassword.saveNewPassword);

app.get('/test/:id', urlencodedParser, user.test);

app.post('/updateName', urlencodedParser, setting.updateName);
app.post('/updateEmail', urlencodedParser, setting.updateEmail);
app.post('/updatePassword', urlencodedParser, setting.updatePassword);

app.post('/addUserTag', urlencodedParser, user.addUserTag);
app.post('/updatePreferences', urlencodedParser, preference.updatePreferences);
app.post('/uploadPhoto', urlencodedParser, preference.uploadPhoto);
app.post('/deletePhoto', urlencodedParser, preference.deletePhoto);

app.post('/getUserToSwipe/', urlencodedParser, home.getUserToSwipe);
app.post('/getTheHeavens/', urlencodedParser, home.getTheHeavens);
app.post('/swipe/', urlencodedParser, home.swipe);

app.post('/saveMessage', urlencodedParser, chat.saveMessage);

app.post('/getUserOnline', urlencodedParser, home.getUserOnline);
app.post('/saveLastConnection', urlencodedParser, home.saveUserLastConnection);

app.post('/addNotification', urlencodedParser, notification.addNotification);

// GET routes
app.get('/setting/:id', urlencodedParser, setting.enterViewSetting);
app.get('/activate/:email', urlencodedParser, activate.enterViewActivate);
app.get('/activateAccount/:email', urlencodedParser, activate.activateAccount);
app.get('/home/:id', urlencodedParser, home.enterViewHome);
app.get('/getUserPhotos/:id', urlencodedParser, user.getUserPhotos);

app.get('/chat/:id', urlencodedParser, chat.loadMatches);
app.get('/loadConversation/:id', urlencodedParser, chat.loadConversation);

app.get('/getTags', urlencodedParser, preference.getTags);
app.get('/getUserTags/:id', urlencodedParser, user.getUserTags);
app.get('/removeMatch/:id', urlencodedParser, user.removeMatch);
app.get('/removeUserTag/:id', urlencodedParser, user.removeUserTag);

app.get('/getProfilePhoto/:id', urlencodedParser, user.getProfilePhoto);

app.get('/randomUser', urlencodedParser, generator.randomUser);

app.get('/getNotifications/:id', urlencodedParser, notification.getNotifications);
app.get('/deleteNotifications/:id', urlencodedParser, notification.deleteNotification);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });