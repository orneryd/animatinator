'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm) {
      elm.text(version);
    };
  }]).directive('animatinator', function() {
      return function (scope, elm, attrs) {
          elm.animatinator(scope.$eval(attrs.animatinator));
      };
  });
