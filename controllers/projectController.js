var Projects = require('../models/projects')
var Users = require('../models/users')
var mongoose = require('mongoose')
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
						{$push:{activePosts: project._id}}, 
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
				project.members.push({
						application:{
							message:req.body.message
							},
						member: req.body.active_user_id
					});//add message to project app
				addProjectToUser(req.body.active_user_id, project, req.body.message, res);
				project.save(function(err) {
					if (err) return res.status(500).send(err);	
				});
				if (req.body.message){
					sendMessageToAdmins(project, req.body.active_user_id,  req.body.message, res)
				}
			} 
			else {
				project.members.forEach(function(elem) {
					if(elem._id.toString() === req.body.active_user_id) {
						return res.json('User already exists');
					} else {
						project.members.push(req.body.active_user_id);
						addProjectToUser(req.body.active_user_id, project, req.body.message, res);
						project.save(function(err) {
							if (err) return res.status(500).send(err);	
						});
						if (req.body.message){
							sendMessageToAdmins(project, req.body.active_user_id, req.body.message, res)
						}
					}			
				});	
			}
			res.json(project)
		})
		
	},
	
	accept: function(req, res){
			var id = mongoose.Types.ObjectId(req.body.project_id);
			Projects.findById(req.body.project_id,  function(err, project) {
				if (err) {return res.status(500).send(err)}
				else{
					project.members.forEach(function(member){
						if (member.member.toString() === req.body.user_id){
							member.application.pending = false;						
						}
					
						//  else {res.send('no user found in project')}
				
					addProjectToUserGroups(req.body.project_id, req.body.user_id, res)
					})
					project.save(function(err) {
								if (err) return res.status(500).send(err);	
							})
				}
			})

			Users.findByIdAndUpdate(req.body.user_id, 
				{$pull:{pendingApprovals:id}}, 
				function(err, success) {
					if (err) return res.status(500).send(err);
					else res.send(success)
				})
				
	},
	
	destroy: function(req, res) {
		Projects.findByIdAndRemove(
			req.body._id, 
			function(err, result) {
				if (err) return res.status(500).send(err);
				res.json(result);
			});
	},
	
	findAll: function(req, res){
		Projects.find(
			{'type': req.params.id })
			.limit(25)
			.populate('admins')
			.exec(
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
					return res.status(500).send(err)
					}
				else{
					res.json(found);
				}
		})
	},
	
	groupMessage: function(req, res){
		
	}
	
}

function addProjectToUser(userId, project, message, res) {
	Users.findByIdAndUpdate(
	userId, 
	{$push:{pendingApprovals: project._id}}, 
	{multi:true},
	function(err, user) {
		if(err) return res.status(500).json(err);
		addMessageToUser(project, user, message, res)//go down
	}
	);
}

function sendMessageToAdmins(project, userId, message, res){
	var existingId = [];
	var index = 0;

	project.admins.forEach(function(elem){//for each admin in array
		Users.findById(elem, function(err, admin){		// go find admin's data	
			if (err) return res.status(500).send(err);

			else if (admin.messages.length > 0){		// if admin we found has messages
				admin.messages.forEach(function(elem){ //go through each meassage
					existingId.push(elem.fromUser.toString())//push the fromId of each message to existingis

				})
				index = existingId.indexOf(userId) //index = the instance of active user in array
				if(index !== -1){
					admin.messages[index].messages.push({message:message})
					admin.save(function(err){
						if (err) return res.status(500).send(err)
					})
				}
				else {
					var id = mongoose.Types.ObjectId(userId);
					admin.messages.push(
						{
						messages:{message:message},
						fromUser:id
						})
					admin.save(function(err){
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
					admin.save(function(err){
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

function addMessageToUser (project, user, message,res){
	var existingMessages = [];
	var index = 0;
	if (user.messages.length > 0) {
			user.messages.forEach(function(obj){ //for each message =obj
				existingMessages.push(obj.fromUser.toString())		 //push obj.fromUser to existing
			})
		project.admins.forEach(function(admin){// loop through the proects admins
			index = existingMessages.indexOf(admin.toString())//for each admin check and see if there is an admin id in existing messages
			if(index === -1){ //if not
				user.messages.push({fromUser:admin, messages:{message:message}})
			}
			else{ //if there is
				user.messages[index].messages.push({message: message})
			}
		})
	}
	else {
		project.admins.forEach(function(admin){
			user.messages.push({fromUser:admin, messages:{message:message}})
		})
	}
	user.save(function(err){
		if (err) return res.status(500).send(err)
	})
}

function addProjectToUserGroups(project, user, res){
	var id = mongoose.Types.ObjectId(project);
	Users.findByIdAndUpdate(user, 
		{$push:{groups:id }}, 
		{multi:true}, 
		function(err, result) {
			if (err) return res.status(500).send(err);
		})
	// user.groups.push(project._id);
	// user.save(function(err){
	// 	if (err) return res.status(500).send(err)
	// })
};