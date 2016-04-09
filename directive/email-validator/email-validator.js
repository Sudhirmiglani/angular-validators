angular.module('validators').directive('emailValidator', function (UtilFactory) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl) {

			ctrl.$validators.invalidEmail = function (value) {
				if (value) {
					return UtilFactory.validateEmail(value);
				}
				return true;
			};
		}
	};
});