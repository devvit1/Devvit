angular.module('devvit').controller('webViewCtrl', function($scope, $timeout, projectService, basicInfoService, $location, $rootScope){
    
      $scope.isActive = function(route) {
      return route === $location.path();
      };
    
	// $scope.people = [
    //     {
    //         Title:"Random1",
    //         userCreated:"John",
    //         Location:"SFO",
    //         Date:"2015-07-12"
    //     },
        
    //     {
    //         Title:"java",
    //         userCreated:"Ben",
    //         Location:"Salt lake city",
    //         Date:"2015-05-09"
    //     },
        
    //     {
    //         Title:"web development",
    //         userCreated:"Ty",
    //         Location:"New jercy",
    //         Date:"2015-03-07"
    //     },
    //     {
    //         Title:"ios",
    //         userCreated:"tan",
    //         Location:"provo",
    //         Date:"2015-04-07"
    //     }
    //     ]
    
    // //$scope.clock = "loading clock..."; // initialise the time variable
    // //$scope.tickInterval = 1000 //ms

    // var tick = function() {
    //     $scope.clock = Date.now() // get the current time
    //     //$timeout(tick, $scope.tickInterval); // reset the timer
    // }

    // // Start the timer
    // $timeout(tick);
    
    // $scope.time = new Date();
        
    $scope.webProjects = [];
    $scope.creator = {};
    projectService.getWebProjects('web').then(function(res) {
      $scope.webProjects = res;
	  // console.log($scope.webProjects);
    })
    
    $scope.custom = true;
    $scope.toggleMessage = function() {
      $scope.custom = $scope.custom === false ? true: false;
    };
    
    $scope.apply = function(projectID, submittedMessage) {
      $scope.applyInfo = {
        project_id: projectID,
        active_user_id: $rootScope.profile._id,
        message: submittedMessage
      }
      projectService.applyToProject($scope.applyInfo).then(function(res){
        console.log("Success");
      })
    }
    
});