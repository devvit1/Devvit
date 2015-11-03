var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	basicInfo: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		userName: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		location: String,
		gitHubUrl: String,
		linkedinUrl: String
	},
	pendingApprovals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	activeGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	inactiveGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	pastGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
	messages: [{ type: String }],
	createdAt: Date
})

module.exports = mongoose.model('Users', UsersSchema)