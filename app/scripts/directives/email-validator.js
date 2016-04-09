'use strict';

/**
 * @ngdoc directive
 * @name validators.directive:emailValidator
 * @description
 * # emailValidator
 */
angular.module('validators').directive('emailValidator', function (utilFactory) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {

      ctrl.$validators.invalidEmail = function (value) {
        if (value) {
          return utilFactory.validateEmail(value);
        }
        return true;
      };
    }
  };
});
