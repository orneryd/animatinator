'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: 'homeController' });
        $routeProvider.when('/login', { templateUrl: 'partials/login.html', controller: 'loginController' });
        $routeProvider.otherwise({ redirectTo: '/home' });
    }]);
