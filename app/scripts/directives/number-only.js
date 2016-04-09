'use strict';

/**
 * @ngdoc directive
 * @name validators.directive:numberOnly
 * @description
 * # numberOnly
 */
angular.module('validators').directive('numberOnly', function ($log) {

  function getPasteContent(e) {
    var copiedContent = '';
    if (!e.clipboardData && e.originalEvent.clipboardData) {
      e.clipboardData = e.originalEvent.clipboardData;
    }
    if (e.clipboardData) {
      if (e.clipboardData.types) {

        // Look for a types property that is undefined
        if (!angular.isArray(e.clipboardData.types)) {
          $log.debug('event.clipboardData.types is undefined');
        }

        // Loop the data store in type and display it
        var i = 0;
        while (i < e.clipboardData.types.length) {
          var key = e.clipboardData.types[i];
          var val = e.clipboardData.getData(key);
          //$log.info((i + 1) + ': ' + key + ' - ' + val);
          if (key === 'text/plain') {
            copiedContent = val;
          }
          i++;
        }

      } else {
        // Look for access to data if types array is missing
        var text = e.clipboardData.getData('text/plain');
        var url = e.clipboardData.getData('text/uri-list');
        var html = e.clipboardData.getData('text/html');
        $log.debug('text/plain - ' + text);
        copiedContent = text;
      }
    }
    return copiedContent;
  }

  function checkNegative(charCode, elem) {
    if (charCode > 31 && (charCode < 48 || charCode > 57) && [45].indexOf(charCode) === -1) {
      return false;
    }
    // check if negative sign already exists
    else if ([45].indexOf(charCode) > -1 && elem.val().indexOf('-') !== -1) {
      return false;
    }
    return true;
  }

  function checkDecimal(charCode, elem) {
    if (charCode > 31 && (charCode < 48 || charCode > 57) && [46].indexOf(charCode) === -1) {
      return false;
    }
    // check if decimal already exists
    else if ([46].indexOf(charCode) > -1 && elem.val().indexOf('.') !== -1) {
      return false;
    }
    return true;
  }


  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {

      var decimalLimit = attrs.decimalLimit;
      var isNegativeAllowed = attrs.negative;

      var regexp;

      if (decimalLimit && isNegativeAllowed) {
        //regexp = /^\-{0,1}\d+(\.[0-9]{1,9})?$/;
        regexp = new RegExp("^\\-{0,1}\\d+(\\.[0-9]{1," + decimalLimit + "})?$");
      }
      else if (decimalLimit) {
        //regexp = /^\d+(\.[0-9]{1,9})?$/;
        regexp = new RegExp("^\\d+(\\.[0-9]{1," + decimalLimit + "})?$");
      }
      else if (isNegativeAllowed) {
        regexp = /^\-{0,1}\d+$/;
      }
      else {
        regexp = /^\d+$/;
      }

      elem.on('keypress', function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (isNegativeAllowed && decimalLimit) {
          return checkNegative(charCode, elem) || checkDecimal(charCode, elem);
        }
        else if (isNegativeAllowed) {
          return checkNegative(charCode, elem);
        }
        else if (decimalLimit) {
          return checkDecimal(charCode, elem);
        } else {
          return !(charCode > 31 && (charCode < 48 || charCode > 57));
        }

      });

      elem.on('paste', function (evt) {
        var val = getPasteContent(evt);

        if (!validateValue(val)) {
          evt.preventDefault();
        }
      });

      function validateValue(currentValue) {
        // check for NaN values
        if (angular.isUndefined(currentValue) || (currentValue !== currentValue)) {
          return true;
        }

        if (currentValue.length === 0) {
          return true;
        }

        return regexp.test(currentValue);

      }

      ctrl.$validators.invalidNumber = function (value) {
        return validateValue(value);
      };

    }
  };
});