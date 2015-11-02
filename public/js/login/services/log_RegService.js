angular.module('devvit').service('log_RegService', function($http){


  this.login = function(user){
      console.log(user);
              // return $http.post('/api/Users', newUser)
  }

  this.createNewUser = function(newUser){
    console.log(newUser);
  }
})
