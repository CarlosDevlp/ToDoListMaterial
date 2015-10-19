'use strict';

describe('Controller: TaskmakerCtrl', function () {

  // load the controller's module
  beforeEach(module('todoListApp'));

  var TaskmakerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskmakerCtrl = $controller('TaskmakerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TaskmakerCtrl.awesomeThings.length).toBe(3);
  });
});
