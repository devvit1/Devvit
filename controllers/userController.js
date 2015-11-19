var Users = require('../models/users');
var AWS = require('../services/amazon')

module.exports = {

  create: function(req, res) {

        var user = new Users(req.body);
        user.save(function(err, new_user) {
          if(err) {
            console.log("can't create user", err);
          }
          else{
            Users.findByIdAndUpdate(new_user._id,
            {filteredGroups:[
              "web",
              "angular",
              "javascript",
            ]},
            function(err, result) {
              if (err) return res.status(500).send(err);
                 res.json(new_user);
              }
            )
          }
          
          
        })
  },

  read: function(req, res) {
    Users.find().exec(function(err, result) {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  },
  countMessages: function(req, res){
    Users.findById(req.user._id)
    .exec(function(err, user){
     if (err) return res.status(500).send(err);    
     var unreadMess = 0;
     user.messages.forEach(function(convo){   
       if(!convo.messages.read) unreadMess++
     })
     res.json(unreadMess)
    })
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
    {'basicInfo.firstName': { "$regex": req.query.query, "$options": "i" }},
    {'basicInfo.lastName': { "$regex": req.query.query, "$options": "i" }}]})
    .exec( 
     function (err, result){
      var users = [];
      function distance(lat1, lon1, lat2, lon2, unit) {
							var radlat1 = Math.PI * lat1/180
							var radlat2 = Math.PI * lat2/180
							var radlon1 = Math.PI * lon1/180
							var radlon2 = Math.PI * lon2/180
							var theta = lon1-lon2
							var radtheta = Math.PI * theta/180
							var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
							dist = Math.acos(dist)
							dist = dist * 180/Math.PI
							dist = dist * 60 * 1.1515
							if (unit=="K") { dist = dist * 1.609344 }
							if (unit=="N") { dist = dist * 0.8684 }
							return dist
						}
      if (err) return res.status(500).send("not found");
      else {
        if(req.query.dis !== "undefined"){
        result.forEach(function(user){
						var dist = distance(req.user.basicInfo.location.lat, req.user.basicInfo.location.lon, user.basicInfo.location.lat, user.basicInfo.location.lon, 'M');
						if (dist <= req.query.dis){
			   			users.push(user)
						}
					})
        }
        else users = result;
        }
        res.json(users)       
        
      }

    )
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