angular.module('validators').factory('utilFactory', function () {

    var regexEmail = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

    return {

        validateEmail: function (number) {
            if (number) {
                return regexEmail.test(number);
            }
            return true;
        }
    };
});