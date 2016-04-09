'use strict';

describe('Directive: maxValue', function () {

  // load the directive's module
  beforeEach(module('validatorsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<max-value></max-value>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the maxValue directive');
  }));
});
