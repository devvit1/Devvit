var mongoose = require('mongoose');

var ProjectsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	subType: String,
	// appliedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
	admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
	members: [{ 
			pending: {type: Boolean, default: true},
			member: {type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
		}],
	messages: [{ type: String }],
	createdAt: { type: Date, default:Date.now }
})

module.exports = mongoose.model('Projects', ProjectsSchema)
