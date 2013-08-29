'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('homeController', ['$scope', '$http', function ($scope, $http) {
      var goptions = {
          elemSelector: '#animate',
          pngPath: 'img/sprite_genetics.png',
          dimx: 70,
          dimy: 70,
          animationSteps: 15,
          duration: 600,
          start: {
              mouseenter: function () {
              },
			  touchstart: function () {
              }
          },
          reverse: {
              mouseleave: function () {
              },
			  touchend: function () {
              }
          }
      };

      var genetics = new Animatinator(goptions);
      var foptions = {
          elemSelector: '#animate1',
          pngPath: 'img/frostbite.png',
          dimx: 192,
          dimy: 192,
          animationSteps: 15,
          duration: 600,
          start: {
              mouseenter: function () {
              },
			  touchstart: function () {
              }
          },
          reverse: {
              mouseleave: function () {
              },
			  touchend: function () {
              }
          }
      };
      var frostbite = new Animatinator(foptions);

  }])
  .controller('loginController', ['$scope', '$http', function ($scope, $http) {
      $scope.openWindow = function () {
          window.open("https://signin.lds.org/obrareq.cgi?" + window.location, "_self");
      };
  }]);