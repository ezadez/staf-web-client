/*jslint node: true */
/*global angular, describe, it, jasmine, expect, beforeEach */
"use strict";

describe("", function(){
  var $route, $rootScope, $location, $httpBackend;

  beforeEach(function(){
    module('staf-web-client');
    inject(function($injector){
      $route = $injector.get('$route');
      //$routeProvider = $injector.get('$routeProvider');
      $rootScope = $injector.get('$rootScope');
      $location = $injector.get('$location');
      $httpBackend = $injector.get('$httpBackend');

    });
  });

  /*
  // /new/testcase
  // /manage/testcase

  it('navigate to new/testcase', function(){
      $httpBackend.when('GET','app/templates/nav/new_test_case.html').respond('/new/testcase');

      $rootScope.$apply(function(){
        $location.path('/new/testcase');
      });

      console.log('$route.current >> '+ $route.constructor);
      expect($location.path()).toBe('/new/testcase');
      //expect($route.current.templateUrl).toBe('app/templates/nav/new_test_case.html');
      //expect($route.current.controller).toBe('testCaseController');
  });
  */
/*

  it('navigate to manage/testcase', function(){
      $httpBackend.when('GET','app/templates/nav/manage_test_case.html').respond('/manage/testcase');

      $rootScope.$apply(function(){
        $location.path('/manage/testcase');
      });

      expect($location.path()).toBe('/manage/testcase');
      expect($route.current.templateUrl).toBe('app/templates/nav/manage_test_case.html');
      expect($route.current.controller).toBe('testCaseController');
  });


//  /new/stepblock
//  /manage/stepblock

  it('navigate to new/stepblock', function(){
      var templateUrl = "app/templates/nav/new_stepblock.html";
      var reqPath = "/new/stepblock";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('stepBlockController');
  });

  it('navigate to manage/stepblock', function(){
      var templateUrl = "app/templates/nav/manage_stepblock.html";
      var reqPath = "/manage/stepblock";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('stepBlockController');
  });


  // /new/variable
  // /manage/variable

  it('navigate to new/variable', function(){
      var templateUrl = "app/templates/nav/new_variable.html";
      var reqPath = "/new/variable";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('variableController');
  });

  it('navigate to manage/variable', function(){
      var templateUrl = "app/templates/nav/manage_variable.html";
      var reqPath = "/manage/variable";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('variableController');
  });


  // /new/users
  // /manage/users

  it('navigate to new/users', function(){
      var templateUrl = "app/templates/nav/new_users.html";
      var reqPath = "/new/users";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('usersController');
  });

  it('navigate to manage/users', function(){
      var templateUrl = "app/templates/nav/manage_users.html";
      var reqPath = "/manage/users";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('usersController');
  });


   // /new/templates
   // /manage/templates

  it('navigate to new/templates', function(){
      var templateUrl = "app/templates/nav/new_templates.html";
      var reqPath = "/new/templates";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('templatesController');
  });

  it('navigate to manage/templates', function(){
      var templateUrl = "app/templates/nav/manage_templates.html";
      var reqPath = "/manage/templates";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('templatesController');
  });


  // /new/carddecks
   ///manage/carddecks

  it('navigate to new/carddecks', function(){
      var templateUrl = "app/templates/nav/new_carddecks.html";
      var reqPath = "/new/carddecks";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('carddecksController');
  });

  it('navigate to manage/templates', function(){
      var templateUrl = "app/templates/nav/manage_carddecks.html";
      var reqPath = "/manage/carddecks";
      $httpBackend.when('GET',templateUrl).respond(reqPath);

      $rootScope.$apply(function(){
        $location.path(reqPath);
      });

      expect($location.path()).toBe(reqPath);
      expect($route.current.templateUrl).toBe(templateUrl);
      expect($route.current.controller).toBe('carddecksController');
  });

*/
});
