angular.module('validators').directive('numberOnly', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            var type = attrs.decimalLimit;
            elem.on('keypress', function(evt) {
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if(type){
                    if (charCode > 31 && (charCode < 48 || charCode > 57) && [46].indexOf(charCode) === -1) {
                        return false;
                    }
                    return true;
                }else{
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        return false;
                    }
                    return true;
                }

            });
        }
    };
});
