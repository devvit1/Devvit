var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	name: String,
	description: String,
	type: {type: String, required: true},
	subType: String,
	appliedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
	admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
	messages: [{ type: String }],
	activeWeb: Boolean,
	activeMobile: Boolean,
	createdAt: Date
})

module.exports = mongoose.model('Projects', ProjectSchema)