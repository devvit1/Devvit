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
			if (err){return res.status(500).send(err)}
			else {
				if (project.appliedTo.indexOf(req.body.active_user_id) === -1 && project.members.indexOf(req.body.active_user_id)) {
					Users.findByIdAndUpdate(
						req.body.active_user_id, 
						{$push:{pendingApprovals: req.body.project_id}},
						{upsert:true}, 
						function(err, result) {
						if (err) {return res.status(500).send(err)}
						else{
							Projects.findByIdAndUpdate(
								req.body.project_id, 
								{$push:{appliedTo: req.body.active_user_id}}, 
								{upsert:true}, 
								function(err, result) {
								if (err) {return res.status(500).send(err)}
								else{	
									for (var admin in req.body.admins) {
										Users.findByIdAndUpdate(
											req.body.admins[admin], 
											{$push:{messages: {message:req.body.message, fromUser: req.body.active_user_id}}}, 
											function(err, result) {
											if (err) {return res.status(500).send(err)}
											else{
												res.json(result);
											}
									})}
								}
							})				
						}
					})
				}//if not found
				else{return res.send("user already exists")}
			}//else
		})//findfunction
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
		Projects.find({}).limit(25).exec(
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