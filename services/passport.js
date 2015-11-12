// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var Users = require('../models/users');

// passport.serializeUser(function(user, done) {
// 	done(null, user.id);
// });
// passport.deserializeUser(function(_id, done) {
// 	Users.findById(_id, function(err, user) {
// 		done(err, user);
// 	});
// });

// passport.use('local-login', new LocalStrategy({
// 	usernameField: 'email',
// 	passwordField: 'password'
// }, function(email, password, done) {
// 	Users.findOne( {'basicInfo.email': email} )
// 	.exec(function(err, user) {
// 		if (err) {
// 			console.log(err);
// 			done(err);
// 		} else if (!user) {
// 			console.log('user not found by email');
// 			return done(null, false, {message: 'user not found by email'});
// 		} else if (user.verifyPassword(password)) {
// 			console.log('password and email are valid');
// 			return done(null, user);
// 		} else {
// 			console.log('wrong password!');
// 			// return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
// 			return done(null, false, {message: 'wrong password!'});
// 		}
// 	});
// }));



// module.exports = passport;