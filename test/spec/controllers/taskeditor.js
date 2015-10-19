'use strict';

describe('Controller: TaskeditorCtrl', function () {

  // load the controller's module
  beforeEach(module('todoListApp'));

  var TaskeditorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskeditorCtrl = $controller('TaskeditorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TaskeditorCtrl.awesomeThings.length).toBe(3);
  });
});
