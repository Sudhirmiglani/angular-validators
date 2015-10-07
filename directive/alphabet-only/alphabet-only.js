angular.module('validators').directive('alphabetOnly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {

            var regex = /^[a-zA-Z]$/;
            element.on('keypress', function (evt) {
                var charCode = (evt.which) ? evt.which : evt.keyCode;

                var keyCodeChar = String.fromCharCode(charCode);

                // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
                if (!regex.test(keyCodeChar)) {
                    event.preventDefault();
                    return false;
                }
                return true;

            });

        }
    };
});
