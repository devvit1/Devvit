angular.module('devvit').controller('webViewCtrl', function($scope, $timeout, projectService, basicInfoService, $location, $rootScope){
    
      $scope.isActive = function(route) {
      return route === $location.path();
      };
        
      $scope.webProjects = [];
      projectService.getProjects('web').then(function(res) {
      $scope.webProjects = res;
      console.log($scope.webProjects)
      console.log("length", $scope.webProjects[1].members.length);

    })
    
    $scope.apply = function(projectID, submittedMessage) {
      $scope.applyInfo = {
        project_id: projectID,
        active_user_id: $rootScope.profile._id,
        message: submittedMessage
      }
      projectService.applyToProject($scope.applyInfo).then(function(res){
        console.log("Success Web");
      })
    }
    
});