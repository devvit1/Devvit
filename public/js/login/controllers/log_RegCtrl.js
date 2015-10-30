angular.module('devvit').controller('loginCtrl', function($scope, loginService){
$scope.getUser = function(){
  log_RegService.getUser().then(function(value){
    $scope.value = value;
    console.log(value);
  })
}

})
