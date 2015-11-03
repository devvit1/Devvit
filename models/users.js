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
	password: String,
	createdAt: Date
})

module.exports = mongoose.model('Users', UsersSchema)