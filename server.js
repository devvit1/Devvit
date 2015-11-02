// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());


// app.use(session({
//   secret: 'twajsdhwa-awdbajbdw-unaudnaks',
//   saveUnitialized: true,
//   resave: true
// }))
// app.use(passport.initialize());
// app.use(passport.session());

//ProjectController
//UserController


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
