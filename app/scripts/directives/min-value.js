'use strict';

/**
 * @ngdoc directive
 * @name validators.directive:minValue
 * @description
 * # minValue
 */
angular.module('validators').directive('minValue', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {

      var minValue;
      var inputVal;

      attrs.$observe('minValue', function (newValue) {
        if (newValue) {
          minValue = Number(newValue);
          ctrl.$validate();
        }
      });

      function validateValue(currentValue, min) {
        if (typeof currentValue === 'undefined') {
          return;
        }

        if (currentValue.length === 0) {
          return;
        }

        return (Number(currentValue) >= min);
      }

      ctrl.$validators.minValue = function (value) {
        inputVal = value;
        return validateValue(value, minValue);
      };


    }
  };
});

