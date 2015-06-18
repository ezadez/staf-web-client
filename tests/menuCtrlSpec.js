/*jslint node: true */
/*global angular, describe, it, jasmine, expect, beforeEach */
"use strict";

describe("staf menu controller", function(){

  var scope, service;
  var $location, httpBackend, $route;
  beforeEach(function(){
    //Create a mock service
    service = jasmine.createSpyObj('menuService',['get']);


    //Mock Angular module
    angular.mock.module('staf-web-client.controllers');

    //Create Song controller and inject mocks
    angular.mock.inject(function($rootScope, $controller, _$location_, _$route_){
      $location = _$location_;
      $route = _$route_;
      service.get.andReturn([{ name:"TestCase",    sub_menus:[{ name: "New", target: ""}, {name: "Manage", target: ""}]}]);

      scope = $rootScope.$new();
      $controller('menuController',{
        $scope: scope,
        menuService:service
      });
    });
  });

  it('retrieves menus on load',function(){
    expect(service.get).toHaveBeenCalled();
    expect(scope.menus.length).toEqual(1);
    expect(scope.menus[0].name).toEqual("TestCase");
    expect(scope.menus[0].sub_menus.length).toEqual(2);
    expect(scope.menus[0].sub_menus[0].name).toEqual("New");
    expect(scope.menus[0].sub_menus[1].name).toEqual("Manage");
    expect(scope.menus[0].sub_menus[0].target).toEqual("");
    expect(scope.menus[0].sub_menus[1].target).toEqual("");
  });

});
