angular.module('validators').directive('maxValue', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            modelValue: '='
        },
        link: function (scope, element, attrs, ctrl) {

            var maxLength;
            var maxValue;
            var inputVal;

            attrs.$observe('maxValue', function (newValue) {
                if (newValue) {
                    maxLength = newValue.length;
                    maxValue = Number(newValue);
                    ctrl.$validate();
                }
            });

            function validateValue(currentValue, max) {
                if (typeof currentValue === 'undefined') {
                    return;
                }

                if (currentValue.length === 0) {
                    return;
                }

                return (Number(currentValue) <= max);
            }

            ctrl.$validators.maxValue = function (value) {
                inputVal = value;
                return validateValue(value, maxValue);
            };
        }
    };
});
