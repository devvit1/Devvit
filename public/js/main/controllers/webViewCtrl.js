angular.module('devvit').controller('webViewCtrl', function($scope, $timeout,$state, projectService, basicInfoService, $location, $rootScope){
    
      $scope.subTypeFilter = ""
      $scope.getProjectTypes = function (){
            
      }
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
        console.log("Success Web");
      })
    }
    $scope.subTypeall = true
    $scope.toggleSubFilter= function(type){
          if (type === "fre"){
                $scope.subTypefre = true;
                $scope.subTypeper = false;
                $scope.subTypepro = false;
                $scope.subTypeall = false;
          }
          else if (type === "per"){
                $scope.subTypefre = false;
                $scope.subTypeper = true;
                $scope.subTypepro = false;
                $scope.subTypeall = false;
          }
          else if (type === "pro"){
                $scope.subTypefre = false;
                $scope.subTypeper = false;
                $scope.subTypepro = true;
                $scope.subTypeall = false;
          }
          else if (type === "all"){
                $scope.subTypefre = false;
                $scope.subTypeper = false;
                $scope.subTypepro = false;
                $scope.subTypeall = true;
          }                              
    }
    /*****************JACOBS QUERY CODE **************/
    
    $scope.searchProjects = function (query, distance){
          if(query){
               
          }
          projectService.searchProjects(query, distance).then(function(res){
             $scope.webProjects = res;     
             console.log(res)    
          })
    }
    
    
    
});