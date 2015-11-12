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
        // var user = new Users(req.body);
        // user.save(function(err, new_user) {
        //   if(err) {
        //     console.log("can't create user", err);
        //   }
        //   res.json(new_user);
        // })
  },

  read: function(req, res) {
    if (!req.user) return res.send('Current user not defined');
    req.user.password = null;
    return res.json(req.user);
    
    // Users.find().exec(function(err, result) {
    //   if (err) return res.status(500).send(err);
    //   res.json(result);
    // });
  },
  
  // readAll: function(req, res) {
  //   Users.find({}).exec(function(err, result) {
  //     if (err) return res.status(500).send(err);
  //     res.json(result);
  //   });
  // },

  userUpdate: function(req, res, done) {
    Users.findByIdAndUpdate(req.user._id, req.body, function(err, result) {
      if (err) done(err);
      res.sendStatus(200);
    })
   
    // Users.findByIdAndUpdate(req.body.basicInfo._id, req.body, { new: true }, function(err, result) {
    //   if (err) return res.status(500).send(err);
    //   res.json(result);
    // });
  },

  destroy: function(req, res) {
    Users.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  },
  //GO BACK
  getActive: function(req, res){
    console.log('TESTER@!!!!@', req.user._id)
    Users.findById(req.user._id)
    .populate('messages.withUser')
    .populate('activePosts')
    .populate({path:'pendingApprovals',
               populate:{path:'createdBy', model:'Users'}})
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