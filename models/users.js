var mongoose = require('mongoose');


var UsersSchema = new mongoose.Schema({
	basicInfo: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		userName: { type: String, required: true },
		email: { type: String, required: true },
		password: {type: String, required: true },
		location: String,
		gitHubUrl: String,
		linkedinUrl: String
	},
	pendingApprovals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	activeGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	inactiveGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	pastGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	messages: [
		{ message: String,
		  fromUser: {type: mongoose.Schema.Types.ObjectId}
		  }
		],
	createdAt: Date
})

UsersSchema.pre('save', true, function(next, done) {
var self = this;

 mongoose.models["Users"].findOne({ 'basicInfo.email': this.basicInfo.email }, function(err, user) {
	 if(err) {
	 	done(err);
	 } else if (user) {
	 	self.invalidate('basicInfo.email', 'email taken')
	 	console.log('user', user);
	 	done(new Error('email is taken'))
	 } else {
	 	done();
	 }
	})
 next();
})

UsersSchema.pre('save', true, function(next, done) {
var self = this;
 mongoose.models["Users"].findOne({ 'basicInfo.userName': this.basicInfo.userName }, function(err, user) {
	 if(err) {
	 	done(err);
	 } else if (user) {
	 	console.log('user', user);
	 	self.invalidate('basicInfo.userName', 'username taken')
	 	done(new Error('username taken'))
	 } else {
	 	done();
	 }
	})
 	next();
})
module.exports = mongoose.model('Users', UsersSchema)
