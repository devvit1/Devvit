var Users = require('../models/users');
var AWS = require('../services/amazon')

module.exports = {

  create: function(req, res) {

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
  findById: function(req, res) {
    Users.findById(req.params.id).exec(function(err, result) {
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
    Users.findByIdAndUpdate(req.body._id, req.body,
     { new: true }, 
     function(err, result) {
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
    if(req.user._id) {
      Users.findById(req.user._id)
      .populate('messages.withUser')
      .populate('activePosts')
      .populate('groups')
      .populate({path:'pendingApprovals',
                populate:{path:'createdBy', model:'Users'}})
      .exec(function(err, result) {
        if (err) return res.status(500).send("not found");
        res.json(result);
      })
    }
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
    Users.findById(req.user._id)
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
            github:user.basicInfo.github,
            linkedin:user.basicInfo.linkedin,
            website:user.basicInfo.website
          },
          skills:user.skills
        })
      })
      res.json(users)

    })
  },
  
  fileUpload: function(req, res) {
    var buf = new Buffer(req.body.filebody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    var fileObj = {
        name: req.body.filename,
        body: buf,
        type: req.body.filetype
    }
    
    AWS.uploadToS3(fileObj, function(err, data){
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            Users.findById(req.user._id, function(err, user) {
              if (err) {
                res.status(500).send(err)
              } else {
                user.basicInfo.image = data.Location
                user.save(function (err, data) {
                   if (err) {
                     res.status(500).send(err)
                   } else {
                     console.log('user', data)
                     res.json(data);
                   }
                })
                // res.send('it worked')
              }
            })
        }
    })
  }
  

};