var app = angular.module('devvit');



app.directive('fileread', function(imageService) {
    return {
        scope: {
            images: '='
        },
        link: function(scope, elem, attrs) {
            elem.bind('change', function(e) {
                var file = elem[0].files[0]
                
                var reader = new FileReader();
                
                reader.onload = function(loadEvent) {
                    var fileBody = reader.result;
                    
                    imageService.uploadImage(fileBody, file).then(function(response) {
                        scope.images.push(response.data)
                    })
                }
                
                reader.readAsDataURL(file)
            })
        }
    }
})