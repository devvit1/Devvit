angular.module('devvit').service('log_RegService', function($http, $rootScope){

  // var currentUser = null;
  // this.currentUser = function() {return currentUser};

	this.getProfile = function(){
		return $http({
				method: 'GET',
				url: '/active' 
			}).then(function(res){
				return res.data
			})
	};
  

  this.login = function(email, password){
      return $http ({
        method: 'POST',
        url: '/login',
        data: {
          email: email,
          password: password
        }
      }).then(function(res) {
        $rootScope.profile = res.data
        // return res;
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
    }, function(err) {
      console.log(err);
      return err;
    })
  }
  })



