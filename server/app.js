const app = require('express')();
const bodyParser = require('body-parser');

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
const jwt = require('jsonwebtoken');
const passport          =     require('passport');
const FacebookStrategy  =     require('passport-facebook').Strategy;
const config = require('./oauth.config.js')
const db = require('./database.js')

const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(passport.initialize());
app.use(passport.session());

// Check the request
const checkUserToken = (req, res, next) => {
  if (!req.header('authorization')) {
    return res.status(401).json({
      success: false,
      message: 'Missing authentication header'
    });
  }
  const token = req.header('authorization').split(' ')[1];
  jwt.verify(token, secret);
  next();
};

// OAuth 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: config.facebook_api_key,
  clientSecret: config.facebook_api_secret,
  callbackURL: config.callback_url,
  profileFields: config.profileFields
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    let sql = 'SELECT * FROM oauth WHERE id_facebook = ?';
    let query = db.format(sql, [profile.id ]);
    db.query(query, (err, response) => {
      if (err) throw err;
      if (response && response.length === 0) {
        let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let query = db.format(sql, [ 
          profile._json.first_name, profile._json.last_name, profile._json.email, null, profile._json.gender,
          profile._json.birthdate, 'Both', null, 20, 18, 60, null, 1, 100, null, 0, null, 0
        ]);
        db.query(query, (err, response) => {
          if (err) throw err;
          else {
            const userId = response.insertId;
            sql = 'INSERT INTO oauth VALUES(id_oauth, ?, ?)'
            query = db.format(sql, [+profile.id, userId ]);
            db.query(query, (err) => {
              if (err) throw err;
            });
          }
        });
      }
    });
    return done(null, profile);
  });
}));
app.get('/auth/facebook', passport.authenticate('facebook'), (req, res) => {
  console.log(res);
});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook'), urlencodedParser, (req, res) => {
    console.log(res);
    res.json({success: true});
  }
);

// POST routes
app.post('/login', urlencodedParser, user.login);
app.post('/updateGeolocation', urlencodedParser, checkUserToken, user.updateGeolocation);
app.post('/register', urlencodedParser, user.register);
app.post('/sendmail', urlencodedParser, user.sendMail);
app.post('/reportUser', urlencodedParser, checkUserToken, user.reportUser);
app.post('/reportUserNotMatched', urlencodedParser, checkUserToken, user.reportUserNotMatched);
app.post('/resetPassword', urlencodedParser, user.resetPassword);
app.post('/checkKey/:email', urlencodedParser, resetPassword.checkKey);
app.post('/saveNewPassword', urlencodedParser, resetPassword.saveNewPassword);

app.get('/test/:id', urlencodedParser, checkUserToken, user.test);

app.post('/updateName', urlencodedParser, checkUserToken, setting.updateName);
app.post('/updateEmail', urlencodedParser, checkUserToken, setting.updateEmail);
app.post('/updatePassword', urlencodedParser, checkUserToken, setting.updatePassword);

app.post('/addUserTag', urlencodedParser, checkUserToken, user.addUserTag);
app.post('/addPrefTag', urlencodedParser, checkUserToken, user.addPrefTag);
app.post('/updatePreferences', urlencodedParser, checkUserToken, preference.updatePreferences);
app.post('/uploadPhoto', urlencodedParser, checkUserToken, preference.uploadPhoto);
app.post('/deletePhoto', urlencodedParser, checkUserToken, preference.deletePhoto);

app.post('/getUserToSwipe/', urlencodedParser, checkUserToken, home.getUserToSwipe);
app.post('/getTheHeavens/', urlencodedParser, checkUserToken, home.getTheHeavens);
app.post('/swipe/', urlencodedParser, checkUserToken, home.swipe);

app.post('/saveMessage', urlencodedParser, checkUserToken, chat.saveMessage);

app.post('/getUserOnline', urlencodedParser, checkUserToken, home.getUserOnline);
app.post('/saveLastConnection', urlencodedParser, checkUserToken, home.saveUserLastConnection);

app.post('/addNotification', urlencodedParser, checkUserToken, notification.addNotification);

// GET routes
app.get('/setting/:id', urlencodedParser, checkUserToken, setting.enterViewSetting);
app.get('/activate/:email', urlencodedParser, activate.enterViewActivate);
app.get('/activateAccount/:email', urlencodedParser, activate.activateAccount);
app.get('/home/:id', urlencodedParser, checkUserToken, home.enterViewHome);
app.get('/getUserPhotos/:id', urlencodedParser, checkUserToken, user.getUserPhotos);

app.get('/chat/:id', urlencodedParser, checkUserToken, chat.loadMatches);
app.get('/loadConversation/:id', urlencodedParser, checkUserToken, chat.loadConversation);

app.get('/getTags', urlencodedParser, checkUserToken, preference.getTags);
app.get('/getUserTags/:id', urlencodedParser, checkUserToken, user.getUserTags);
app.get('/getPreferenceTags/:id', urlencodedParser, checkUserToken, user.getPreferenceTags);
app.get('/removeMatch/:id', urlencodedParser, checkUserToken, user.removeMatch);
app.get('/removeUserTag/:id', urlencodedParser, checkUserToken, user.removeUserTag);
app.get('/removePrefTag/:id', urlencodedParser, checkUserToken, user.removePrefTag);

app.get('/getProfilePhoto/:id', urlencodedParser, checkUserToken, user.getProfilePhoto);

app.get('/randomUser', urlencodedParser, checkUserToken, generator.randomUser);

app.get('/getNotifications/:id', urlencodedParser, checkUserToken, notification.getNotifications);
app.get('/deleteNotifications/:id', urlencodedParser, checkUserToken, notification.deleteNotification);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });