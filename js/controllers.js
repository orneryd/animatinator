'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('homeController', ['$scope', '$http', function ($scope, $http) {
      var baseOpts = {
          dimx: 70,
          dimy: 70,
          animationSteps: 15,
          duration: 600,
          start: {
              mouseenter: function() {
              },
              touchstart: function() {
              }
          },
          reverse: ["mouseleave", "touchend"]
      };
      $scope.frostbite = $.extend(baseOpts, {
          elemSelector: '#frostbite',
          imgPath: 'img/frostbite.png',
          dimx: 192,
          dimy: 192,
      });
  }]).
  controller('rootController', ['$scope', '$http', function ($scope) {
      var baseOpts = {
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
          reverse: ["mouseleave", "touchend"]
      };
      $scope.about = $.extend({}, baseOpts, {
          elemSelector: '#about',
          imgPath: 'img/about.png'
      });
      $scope.animateAll = function() {
          angular.forEach($scope.animators, function(item) {
              item.startAnimate(function () {
                  item.reverseAnimate();
              });
          });
      };
      $scope.animate = function(key) {
          $scope.animators[key].startAnimate(function() {
              $scope.animators[key].reverseAnimate();
          });
      };
      $scope.home = $.extend({}, baseOpts, {
          elemSelector: '#home',
          imgPath: 'img/innovation.png'
      });
      $scope.examples = $.extend({}, baseOpts, {
          elemSelector: '#examples',
          imgPath: 'img/genetics.png'
      });
      $scope.media = $.extend({}, baseOpts, {
          elemSelector: '#media',
          imgPath: 'img/media.png'
      });
  }]);