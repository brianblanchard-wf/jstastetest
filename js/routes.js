var app = angular.module('boilerplate.routes', ['boilerplate.services']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/some/:url', {
        controller: function() {
        },
        template: "<span></span>"
    });

    $locationProvider.html5Mode(true);
}]);