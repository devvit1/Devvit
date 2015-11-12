/// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var cors = require('cors');
var moment = require('moment');

//CONTROLLERS
var UserController = require('./controllers/userController');
var ProjectController = require('./controllers/projectController');
var MessageController = require('./controllers/messageController');


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());
app.use(flash());

/////////////////
///Local Auth///
///////////////

var passport = require('./services/passport');

var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.sendStatus(401);
  return next();
};

app.use(session({
  secret: 'twajsdhwa-awdbajbdw-unaudnaks',
  saveUnitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', passport.authenticate('local-login', { 
  // failureRedirect: '/#/profile/login-register', 
  // successRedirect: '/#/home', 
  failureFlash: true 
}), function(req, res){
  res.send(req.user);
});


app.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/#/home');
  return res.send('logged out');
})


//ProjectController
app.get(        '/projects/:id',   ProjectController.findAll);
app.get(        '/project/:id',    ProjectController.find);
app.post(       '/projects',       ProjectController.createProj);
app.put (       '/project/:id',    ProjectController.projectUpdate);
app.put(        '/projects',       ProjectController.apply);
app.delete(     '/project/:id',    ProjectController.destroy);
app.put(        '/accept',         ProjectController.accept);
app.put(        '/deny',           ProjectController.deny);
app.post(       '/groupmessage',   ProjectController.groupMessage);


//UserController
app.get(        '/user',       isAuthed, UserController.read);
// app.get(        '/user',           UserController.readAll);
app.post(       '/user',           UserController.create);
app.put(        '/user',           isAuthed, UserController.userUpdate);
app.delete(     '/user/:id',       UserController.destroy);
app.get(        '/active',     UserController.getActive);
app.get(        '/getusers/:id',    UserController.getUsers)

app.get(        '/activeMessageInfo/:id',                     UserController.getActiveMessageInfo);
app.get(        '/activeMessages/:otherId/current/:activeId', UserController.getActiveUserMessages);
app.get(        '/getusers/:id',                              UserController.getUsers)


app.put(        '/newmessage',          MessageController.newMessage);
app.put(        '/addmessage',          MessageController.addMessage)

var mongoURI = 'mongodb://localhost:27017/devvit';
var port = 8080;

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
});

app.listen(port, function() {
  console.log('Listening on port '+ port);
});
