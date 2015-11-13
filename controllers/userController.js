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


    var newUser = new Users(req.body);
    newUser.save(function(err, user) {
      if(err) return res.send(err);
      user.password = null;
      return res.send(user);
    });
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
    Users.findByIdAndUpdate(req.body.basicInfo._id, req.body, { new: true }, function(err, result) {
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
    console.log('TESTER@!!!!@', req.user)
    Users.findById(req.user._id)
    .populate('messages.withUser')
    .populate('activePosts')
    .populate({path:'pendingApprovals',
               populate:{path:'createdBy', model:'Users'}})
    .populate('groups')
    .exec(function(err, result) {
      if (err) return res.status(500).send("not found");
      console.log('POOOOO', result);
      res.json(result);
    })
  },
  
 getUsers: function(req, res){
    Users.find({$or:[
    {'basicInfo.firstName': { "$regex": req.params.id, "$options": "i" }},
    {'basicInfo.lastName': { "$regex": req.params.id, "$options": "i" }}]}, 
     function (err, result){
      var users = [];
      if (err) return res.status(500).send("not found");
      result.forEach(function(user){
        users.push({
          _id: user._id,
          basicInfo: {
            first:user.basicInfo.firstName,
            last:user.basicInfo.lastName,
            userName: user.basicInfo.userName,
            email: user.basicInfo.email,
            location: user.basicInfo.location,
            github:user.basicInfo.githubUrl,
            linkedin:user.basicInfo.linkedinUrl
          },
        })
      })
      res.json(users)

    })
  }
  

};