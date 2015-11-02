var Projects = require('models/projects')
var Users = require('models/users')

module.exports = {
	createProj: function(req, res) {
		Projects.create(req.body, function(err, result) {
			if (err) {
				return res.status(500).send(err)}
			else{
				res.json(result);
			}
		});

	},

	apply: function (req, res){
		Users.findByIdAndUpdate(req.user._id, {$push:{pendingApprovals: req.body._id}}, function(err, result) {
			if (err) {
				return res.status(500).send(err)}
			else{
				Projects.findByIdAndUpdate(req.body._id, {$push:{appliedTo: req.user._id}}, function(err, result) {
					if (err) {
						return res.status(500).send(err)}
					else{	
						for (var admin in req.body.admins) {
							Users.findByIdAndUpdate(req.body.admins[admin]._id, {$push:{messages: req.body.message}}, function(err, result) {
								if (err) {
									return res.status(500).send(err)}
								else{
									res.json(result);
								}
						})}
					}
				})				
			}
		})


	},
	delete: function(req, res) {
		Projects.findByIdAndRemove(req.params._id, function(err, result) {
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
	}
	
}