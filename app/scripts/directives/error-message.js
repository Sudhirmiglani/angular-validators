'use strict';

/**
 * @ngdoc directive
 * @name validators.directive:errorMessage
 * @description
 * # errorMessage
 */
angular.module('validators').directive('errorInputWrapper', function () {
  return {
    restrict: 'A',
    priority: 1000,
    require: ['^form'],
    scope: true,
    link: function (scope, element, attrs, ctrl) {
      scope.form = ctrl[0];
      scope.fieldName = attrs.field;

      scope.$watch(function () {
        return !angular.equals({}, scope.form[scope.fieldName].$error) &&
            (scope.form[scope.fieldName].$dirty || scope.form.$submitted);
      }, function (v) {
        if (v) {
          element.addClass("has-error");
        }
        else {
          element.removeClass("has-error");
        }
      });
    },
    controller: function ($scope) {

    }
  };
});


angular.module('validators').directive('errorBlock', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    priority: 1001,
    require: ['^errorInputWrapper'],
    template: '<div class="help-block error" ng-show="(!angular.equals({}, form[fieldName].$error) || form[fieldName].$invalid)  &&' +
    '(form[fieldName].$dirty || form.$submitted)">' +
    '<ng-transclude></ng-transclude>' +
    '</div>'

  };
});

angular.module('validators').directive('errorMessage', function () {
  return {
    restrict: 'E',
    replace: true,
    priority: 1002,
    scope: true,
    require: ['^errorInputWrapper'],
    template: '<div ng-show="form[fieldName].$error[errorType]"><div class="help-block__icon margin-right-xs">' +
    '<a href="#" class="" data-dismiss="alert" aria-label="">' +
    '<i class="material-icons">error</i>' +
    '</a>' +
    '</div>' +
    '<div class="help-block__msg">' +
    '<p>{{message}}</p>' +
    '</div></div>',


    link: function (scope, element, attrs, fn) {
      scope.errorType = attrs.type;
      scope.message = attrs.message;
    }
  };
});
