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
  //GO BACK
  getActive: function(req, res){
    Users.findById(req.params.id)
    .populate('messages.withUser')
    .populate('activePosts')
    .exec(function(err, result) {
      if (err) return res.status(500).send("not found");
      res.json(result);
    })
  },
  
   getActiveMessageInfo: function(req, res){
    Users.findById(req.params.id)
    .populate('messages.withUser', 'basicInfo.firstName basicInfo.lastName')
    .exec(function(err, result) {
      if (err) return res.status(500).send("not found");
      res.json(result);
    })
  },
  
  getActiveUserMessages: function(req, res){
    Users.findById(req.params.activeId)
    .exec(function(err, result) {
      if (err) return res.status(500).send("not found");
      var messagesArr = result.messages;
        var newArr = [];
      for(var i = 0; i < messagesArr.length; i++) {
        var obj = messagesArr[i]; 
          if (obj.withUser == req.params.otherId) {
            newArr = obj.messages;

          }
         }
         console.log(newArr)
       res.json(newArr);
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