var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UsersSchema = new mongoose.Schema({
	basicInfo: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		userName: { type: String, required: true },
		email: { type: String, required: true },
		password: {type: String, required: true },
		location: String,
		gitHub: String,
		linkedin: String
	},
	pendingApprovals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	activePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	pastGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	
	messages: [
		{ messages: [{
				message:{type:String},
				time: {type: Date, default:Date.now()},
				read: {type:Boolean, default:false},
				from: {type: mongoose.Schema.Types.ObjectId}
				}],
		  withUser: {type: mongoose.Schema.Types.ObjectId},

		}
	],
	skills: [{type:String}],
	bio:{type:String},		
	createdAt: {type: Date, default:Date.now()}
})


UsersSchema.pre('save', function(next) {
		var user = this;
		if (!user.isModified('basicInfo.password'))     return next();
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(user.basicInfo.password, salt);
	user.basicInfo.password = hash;
	return next(null, user);	
});

UsersSchema.methods.verifyPassword = function(reqBodyPassword) {
	var user = this;
	return bcrypt.compareSync(reqBodyPassword, user.basicInfo.password);
};
module.exports = mongoose.model('Users', UsersSchema)
