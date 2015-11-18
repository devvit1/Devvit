angular.module('devvit').controller('webViewCtrl', function($scope, $timeout,$state, projectService, basicInfoService, $location, $rootScope){
    
      $scope.subTypeFilter = ""
      $scope.isActive = function(route) {
      return route === $location.path();
      };
      $scope.orderThis = $scope.sortByOption;
      $scope.webProjects = [];
      projectService.getProjects().then(function(res) {
            console.log(res)
            $scope.webProjects = res;
      })
      $scope.findAll = function(){
             projectService.getProjects().then(function(res) {
              console.log(res)
            $scope.webProjects = res;
      })
      }
    
    $scope.goToUser = function (user){
          $state.go('devvit.users', {
                user: user
          })
    }
    
    	$scope.save = false;
  	   $scope.toggleView = function() {
  		  $scope.save = !$scope.save;
      }

    
    $scope.apply = function(projectID, submittedMessage) {
      $scope.applyInfo = {
        project_id: projectID,
        active_user_id: $rootScope.profile._id,
        message: submittedMessage
      }
      projectService.applyToProject($scope.applyInfo).then(function(res){
        console.log("Success Web", res);
        window.location.reload(true);
      })
    }
    
    /*****************JACOBS QUERY CODE **************/
    
    $scope.searchProjects = function (query, distance){
          projectService.searchProjects(query, distance).then(function(res){
             $scope.webProjects = res;     
             console.log(res)    
          })
    }
    
    
    
});