var Users = require('../models/users');

module.exports = {

  create: function(req, res) {
    // Users.findOne({ 'basicInfo.email': req.body.basicInfo.email })
    //   .exec()
    //   .then(function(user) {
    //     console.log(user);
    //     if(user) {
    //       return res.status(400).json({message: "User with this email already exists"});
    //     }


        var user = new Users(req.body);
        user.save(function(err, new_user) {
          if(err) {
            console.log("can't create user", err);
          }
          res.json(new_user);
        })
  },

  read: function(req, res) {
    Users.find().exec(function(err, result) {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  },
  
  // readAll: function(req, res) {
  //   Users.find({}).exec(function(err, result) {
  //     if (err) return res.status(500).send(err);
  //     res.json(result);
  //   });
  // },

  userUpdate: function(req, res) {
    Users.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  },

  destroy: function(req, res) {
    Users.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  },
  
  getActive: function(req, res){
    Users.findById(req.params.id, function(err, result) {
      if (err) return res.status(500).send("not dvfound");
      res.json(result);
    })
  }
  

};