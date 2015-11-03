var Projects = require('../models/projects')
var Users = require('../models/users')

module.exports = {
	createProj: function(req, res) {
		Projects.create(req.body, function(err, result) {
			if (err) {
				return res.status(500).send(err)}
			else{
				Projects.findByIdAndUpdate(result._id, {$push:{admins: req.body.active_user_id}}, function(err, result) {
					if (err) {
						return res.status(500).send(err)}
					else{
						res.json(result);
					}
				})
			};
		})
	},

	apply: function (req, res){
		Users.findByIdAndUpdate(req.body.active_user_id, {$push:{pendingApprovals: req.body.project_id}}, function(err, result) {
			if (err) {return res.status(500).send(err)}
			else{
				Projects.findByIdAndUpdate(req.body.project_id, {$push:{appliedTo: req.body.active_user_id}}, function(err, result) {
					if (err) {return res.status(500).send(err)}
					else{	
						for (var admin in req.body.admins) {
							Users.findByIdAndUpdate(req.body.admins[admin], {$push:{messages: req.body.message}}, function(err, result) {
								if (err) {return res.status(500).send(err)}
								else{
									res.json(result);
								}
						})}
					}
				})				
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
	}
	
}