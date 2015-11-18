/// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
// var moment = require('moment');

var UserController = require('./controllers/userController');
var ProjectController = require('./controllers/projectController');
var MessageController = require('./controllers/messageController');


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());


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


app.post('/login', 
  passport.authenticate('local-login', { 
      successRedirect: '/#/home', 
      failureRedirect: '/#/login', 

}), function(req, res){
  res.send(req.user);
});


app.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
  res.send('logged out');
})

app.get('/isAuth', isAuthed, function(req, res) {
	res.send(req.user);
});



//ProjectController
app.get(        '/projects',      ProjectController.findAll);
app.get(        '/project/:id',    ProjectController.find);
app.get(        '/ptsearch/',ProjectController.searchFor);
app.post(       '/projects',       ProjectController.createProj);
app.put (       '/project',        ProjectController.projectUpdate);
app.put(        '/projects',       ProjectController.apply);
app.delete(     '/project/:id',    ProjectController.destroy);
app.put(        '/accept',         ProjectController.accept);
app.put(        '/deny',           ProjectController.deny);
app.post(       '/groupmessage',    ProjectController.groupMessage);


//UserController

app.get(        '/user',                                      UserController.read);
app.post(       '/fileUpload',                                UserController.fileUpload)
app.get(        '/users/:id',                                 UserController.findById);
app.post(       '/user',                                      UserController.create);
app.put(        '/user',                                      UserController.userUpdate);
app.delete(     '/user/:id',                                  UserController.destroy);
app.get(        '/active',                                    UserController.getActive);
app.get(        '/activeMessageInfo/:id',                     UserController.getActiveMessageInfo);
app.get(        '/activeMessages/:otherId/current',           UserController.getActiveUserMessages);
app.get(        '/getusers/:id',                              UserController.getUsers)



app.put(        '/newmessage',     MessageController.newMessage);
app.put(        '/addmessage',     MessageController.addMessage)

var mongoURI = 'mongodb://localhost:27017/devvit';
// var port = 8080;

// var mongoURI = process.env.MONGOLAB_URI;
var port = process.env.PORT || 8080;

// var mongoURI = process.env.MONGOLAB_URI;
// var port = process.env.PORT || 9999;

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
});

app.listen(port, function() {
  console.log('Listening on port '+ port);
});
