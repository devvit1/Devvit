angular.module('devvit').service('log_RegService', function($http){

  var currentUser = null;
  this.currentUser = function() {return currentUser};

  this.login = function(email, password){
      return $http ({
        method: 'POST',
        url: '/login',
        data: {
          email: email,
          password: password
        }
      }).then(function(res) {
        console.log(res);
        currentUser = res.data;
        return res;
      }, function(err){
        console.log(err);
        return err;
      })
  }

  this.createNewUser = function(newUser){
    var User = {
          basicInfo:{
              firstName: newUser.firstname,
              lastName: newUser.lastname,
              userName: newUser.username,
              email: newUser.email,
              password: newUser.password
            }
    }

    return $http ({
      method: 'POST',
      url: '/user',
      data: User
    }).then(function(res) {
      console.log('Success');
    })
  }
})
