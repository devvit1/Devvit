angular.module('devvit').directive('contenteditable', function(){
return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
<<<<<<< HEAD
});
=======
});

>>>>>>> 9fdc2b29a85bfbd8b0ca03e886c174238bcf5315
