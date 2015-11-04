var Projects = require('../models/projects')
var Users = require('../models/users')

module.exports = {
	createProj: function(req, res) {
		Projects.create(req.body, function(err, project) {
			if (err) {
				return res.status(500).send(err)}
			else{
				Projects.findByIdAndUpdate(project._id, {$push:{admins: req.body.active_user_id}}, function(err, result) {
					if (err) {
						return res.status(500).send(err)}
					else{
						Users.findByIdAndUpdate(req.body.active_user_id, 
						{$push:{activeGroups: project._id}}, 
						function(err, result) {
							if (err) {return res.status(500).send(err)}
							else{
								res.json(result);
							}
						})
					}
				})
			};
		})
	},

	apply: function (req, res){
		Projects.findById(req.body.project_id, function(err, project){
			if (err) return res.status(500).send(err);
			if(project.members.length == 0) {
				project.members.push(req.body.active_user_id);
				addProjectToUser(req.body.active_user_id, req.body.project_id, res, project);
				project.save(function(err, succ) {
					if (err) return res.status(500).send(err);	
				});
				if (req.body.message){
					sendMessageToAdmins(project, req.body.active_user_id, req.body.project_id, req.body.message, res)
				}
			} 
			else {
				project.members.forEach(function(elem) {
					if(elem._id.toString() === req.body.active_user_id) {
						return res.json('User already exists');
					} else {
						project.members.push(req.body.active_user_id);
						addProjectToUser(req.body.active_user_id, req.body.project_id, res, project);
						project.save(function(err, succ) {
							if (err) return res.status(500).send(err);	
						});
						if (req.body.message){
							sendMessageToAdmins(project, req.body.active_user_id, req.body.project_id, req.body.message, res)
						}
					}			
				});	
			}
		})
	},
	
	accept: function(req, res){
			Projects.findByIdAndUpdate(req.body.project_id, {$push:{members: req.body.user_id}}, function(err, result) {
			if (err) {
				return res.status(500).send(err)}
			else{
				Projects.findByIdAndUpdate(req.body.project_id, {$pull:{appliedTo: req.body.user_id}}, function(err, result) {
				if (err) {
					return res.status(500).send(err)}
				else{
					res.json(result);
				}
		})
			}
		})
			
	},
	destroy: function(req, res) {
		Projects.findByIdAndRemove(req.body._id, function(err, result) {
			if (err) return res.status(500).send(err);
				res.json(result);
		});
	},
	findAll: function(req, res){
		Projects.find({'type': req.params.id }).limit(25).populate('admins').exec(
			function(err, result) {
				if (err) {
					return res.status(500).send(err)}
				else{
					res.json(result);
				}
		})
	},
	find: function(req, res){
		Projects.findById(req.params.id, function(err, found){
			if (err) {
					return res.status(500).send(err)}
				else{
					res.json(found);
				}
		})
	},
	groupMessage: function(req, res){
		
	}
	
}

function addProjectToUser(userId, projectId, res, project) {
	Users.findByIdAndUpdate(
	userId, 
	{$push:{pendingApprovals: projectId}}, 
	{multi:true},
	function(err) {
		if(err) return res.status(500).json(err);
	}
	);
}

function sendMessageToAdmins(project, userId, projectId, message, res){
	var existingId = [];
	var index = 0;

	project.admins.forEach(function(elem){
		Users.findById(elem, function(err, admin){
			if (err) return res.status(500).send(err);
			else if (admin.messages.length > 0){		
				admin.messages.forEach(function(elem){
					existingId.push(elem.fromUser.toString())			
				})
				index = existingId.indexOf(userId)
				if(index !== -1){
					admin.messages[index].messages.push({message:message})
					admin.save(function(err, succ){
						if (err) return res.status(500).send(err)
					})
				}
				else {
					admin.messages.push(
						{
						messages:{message:message},
						fromUser:userId
						})
					admin.save(function(err, succ){
						if (err) return res.status(500).send(err)
					})
				}
			}
			else {
					admin.messages.push(
						{
						messages:{message:message},
						fromUser:userId
						})
					admin.save(function(err, succ){
						if (err) return res.status(500).send(err)
					})
				}
		})
	})
}

function save(obj, res){
	obj.save(function(err, succ){
		if (err) return res.status(500).send(err)
	})
}