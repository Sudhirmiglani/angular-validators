'use strict';

describe('Service: utilFactory', function () {

  // load the service's module
  beforeEach(module('validatorsApp'));

  // instantiate service
  var utilFactory;
  beforeEach(inject(function (_utilFactory_) {
    utilFactory = _utilFactory_;
  }));

  it('should do something', function () {
    expect(!!utilFactory).toBe(true);
  });

});
