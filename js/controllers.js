'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('homeController', ['$scope', function ($scope) {
      var baseOpts = {
          dimx: 70,
          dimy: 70,
          frames: 15,
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
  controller('rootController', ['$scope', function ($scope) {
      var baseOpts = {
          dimx: 70,
          dimy: 70,
          frames: 15,
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
          imgPath: 'img/innovation.png'
      });
      $scope.examples = $.extend({}, baseOpts, {
          imgPath: 'img/genetics.png'
      });
      $scope.media = $.extend({}, baseOpts, {
          imgPath: 'img/media.png'
      });
  }]);