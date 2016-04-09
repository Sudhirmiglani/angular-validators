"use strict";
angular.module("validators", []), angular.module("validators").directive("emailValidator", ["utilFactory", function (a) {
    return {
        restrict: "A", require: "ngModel", link: function (b, c, d, e) {
            e.$validators.invalidEmail = function (b) {
                return b ? a.validateEmail(b) : !0
            }
        }
    }
}]), angular.module("validators").directive("alphabetOnly", function () {
    return {
        restrict: "A", link: function (a, b, c, d) {
            var e = /^[a-zA-Z]$/;
            b.on("keypress", function (a) {
                var b = a.which ? a.which : a.keyCode, c = String.fromCharCode(b);
                return e.test(c) ? !0 : (event.preventDefault(), !1)
            })
        }
    }
}), angular.module("validators").directive("numberOnly", ["$log", function (a) {
    function b(b) {
        var c = "";
        if (!b.clipboardData && b.originalEvent.clipboardData && (b.clipboardData = b.originalEvent.clipboardData), b.clipboardData)if (b.clipboardData.types) {
            angular.isArray(b.clipboardData.types) || a.debug("event.clipboardData.types is undefined");
            for (var d = 0; d < b.clipboardData.types.length;) {
                var e = b.clipboardData.types[d], f = b.clipboardData.getData(e);
                "text/plain" === e && (c = f), d++
            }
        } else {
            var g = b.clipboardData.getData("text/plain");
            b.clipboardData.getData("text/uri-list"), b.clipboardData.getData("text/html");
            a.debug("text/plain - " + g), c = g
        }
        return c
    }

    function c(a, b) {
        return a > 31 && (48 > a || a > 57) && -1 === [45].indexOf(a) ? !1 : !([45].indexOf(a) > -1 && -1 !== b.val().indexOf("-"))
    }

    function d(a, b) {
        return a > 31 && (48 > a || a > 57) && -1 === [46].indexOf(a) ? !1 : !([46].indexOf(a) > -1 && -1 !== b.val().indexOf("."))
    }

    return {
        restrict: "A", require: "ngModel", link: function (a, e, f, g) {
            function h(a) {
                return angular.isUndefined(a) || a !== a ? !0 : 0 === a.length ? !0 : i.test(a)
            }

            var i, j = f.decimalLimit, k = f.negative;
            i = j && k ? new RegExp("^\\-{0,1}\\d+(\\.[0-9]{1," + j + "})?$") : j ? new RegExp("^\\d+(\\.[0-9]{1," + j + "})?$") : k ? /^\-{0,1}\d+$/ : /^\d+$/, e.on("keypress", function (a) {
                var b = a.which ? a.which : a.keyCode;
                return k && j ? c(b, e) || d(b, e) : k ? c(b, e) : j ? d(b, e) : !(b > 31 && (48 > b || b > 57))
            }), e.on("paste", function (a) {
                var c = b(a);
                h(c) || a.preventDefault()
            }), g.$validators.invalidNumber = function (a) {
                return h(a)
            }
        }
    }
}]), angular.module("validators").directive("errorInputWrapper", function () {
    return {
        restrict: "A", priority: 1e3, require: ["^form"], scope: !0, link: function (a, b, c, d) {
            a.form = d[0], a.fieldName = c.field, a.$watch(function () {
                return !angular.equals({}, a.form[a.fieldName].$error) && (a.form[a.fieldName].$dirty || a.form.$submitted)
            }, function (a) {
                a ? b.addClass("has-error") : b.removeClass("has-error")
            })
        }, controller: ["$scope", function (a) {
        }]
    }
}), angular.module("validators").directive("errorBlock", function () {
    return {
        restrict: "E",
        replace: !0,
        transclude: !0,
        priority: 1001,
        require: ["^errorInputWrapper"],
        template: '<div class="help-block error" ng-show="(!angular.equals({}, form[fieldName].$error) || form[fieldName].$invalid)  &&(form[fieldName].$dirty || form.$submitted)"><ng-transclude></ng-transclude></div>'
    }
}), angular.module("validators").directive("errorMessage", function () {
    return {
        restrict: "E",
        replace: !0,
        priority: 1002,
        scope: !0,
        require: ["^errorInputWrapper"],
        template: '<div ng-show="form[fieldName].$error[errorType]"><div class="help-block__icon margin-right-xs"><a href="#" class="" data-dismiss="alert" aria-label=""><i class="material-icons">error</i></a></div><div class="help-block__msg"><p>{{message}}</p></div></div>',
        link: function (a, b, c, d) {
            a.errorType = c.type, a.message = c.message
        }
    }
}), angular.module("validators").directive("maxValue", function () {
    return {
        restrict: "A", require: "ngModel", scope: {modelValue: "="}, link: function (a, b, c, d) {
            function e(a, b) {
                return "undefined" != typeof a && 0 !== a.length ? Number(a) <= b : void 0
            }

            var f, g, h;
            c.$observe("maxValue", function (a) {
                a && (f = a.length, g = Number(a), d.$validate())
            }), d.$validators.maxValue = function (a) {
                return h = a, e(a, g)
            }
        }
    }
}), angular.module("validators").directive("minValue", function () {
    return {
        restrict: "A", require: "ngModel", link: function (a, b, c, d) {
            function e(a, b) {
                return "undefined" != typeof a && 0 !== a.length ? Number(a) >= b : void 0
            }

            var f, g;
            c.$observe("minValue", function (a) {
                a && (f = Number(a), d.$validate())
            }), d.$validators.minValue = function (a) {
                return g = a, e(a, f)
            }
        }
    }
}), angular.module("validators").factory("utilFactory", function () {
    var a = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    return {
        validateEmail: function (b) {
            return b ? a.test(b) : !0
        }
    }
}), angular.module("validators").run(["$templateCache", function (a) {
    a.put("views/main.html", '<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')
}]);