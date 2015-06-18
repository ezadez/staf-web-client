/*jslint node: true */
/*global angular, describe, it, jasmine, expect, beforeEach, spyOn */
"use strict";

describe('Song storage service', function() {
  var scope, store;

  beforeEach(function() {
    store = [ ];

    angular.mock.module('staf-web-client.services');
    angular.mock.inject(function($injector) {
      scope = $injector.get('menuService');
    });
  });

  it('get menu in menus', function() {
    var actualMenu = scope.get();
    expect(actualMenu.length).toEqual(7);

    var expectedMenus = [
        { name:"Dashboard",   target: "dashboard", sub_menus:[{ name: "dashboard", target: "dashboard"}]},
        { name:"TestCase",    target: "", sub_menus:[{ name: "New", target: "testcase-create"}  , {name: "Manage", target: "testcase-manage"}]},
        { name:"StepBlocks",  target: "", sub_menus:[{ name: "New", target: "stepblock-create"} , {name: "Manage", target: "stepblock-manage"}]},
        { name:"Variables",   target: "", sub_menus:[{ name: "New", target: "variable-create"}  , {name: "Manage", target: "variable-manage"}]},
        { name:"Users",       target: "", sub_menus:[{ name: "New", target: "users-create"}     , {name: "Manage", target: "users-manage"}]},
        { name:"Templates",   target: "", sub_menus:[{ name: "New", target: "templates-create"} , {name: "Manage", target: "templates-manage"}]},
        { name:"CardDeck",    target: "", sub_menus:[{ name: "New", target: "carddecks-create"} , {name: "Manage", target: "carddecks-manage"}]}
      ];

    expect(actualMenu).toEqual(expectedMenus);
  });
});
