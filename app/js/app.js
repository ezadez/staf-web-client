/*jslint node: true */
/*jslint nomen: true */
/*global angular, _ */
"use strict";


  var app = angular.module('staf-web-client',[
    'ngRoute',
    'underscore.string',
    'ui.bootstrap',
    'ui.router',
    'ui.grid',
    'ui.grid.resizeColumns',
    'staf-web-client.services',
    'staf-web-client.directives',
    'staf-web-client.controllers'
  ]);

  app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/dashboard");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      //templateUrl: "staf-index.html",
      controller: 'menuController'
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard.html",
      controller: 'dashboardController'
    })
    .state('testcase-create', {
      url: "/testcase/create",
      templateUrl: "test_case/new_test_case.html",
      controller: 'testCaseController'
    })
    .state('testcase-manage', {
      url: "testcase/manage",
      templateUrl: "test_case/new_test_case.html",
      controller: 'testCaseController'
    })
    .state('stepblock-create', {
      url: "/stepblock/create",
      templateUrl: "stepblock/new_stepblock.html",
      controller: 'stepBlockController'
    })
    .state('stepblock-manage', {
      url: "/stepblock/manage",
      templateUrl: "stepblock/new_stepblock.html",
      controller: 'stepBlockController'
    })
    .state('variable-create', {
      url: "/variable/create",
      templateUrl: "variable/new_variables.html",
      controller: 'variableController'
    })
    .state('variable-manage', {
      url: "/variable/manage",
      templateUrl: "variable/new_variables.html",
      controller: 'variableController'
    })
    .state('users-create', {
      url: "/users/create",
      templateUrl: "user/new_users.html",
      controller: 'usersController'
    })
    .state('users-manage', {
      url: "/users/manage",
      templateUrl: "user/new_users.html",
      controller: 'usersController'
    })
    .state('templates-create', {
      url: "/templates/create",
      templateUrl: "template/new_template.html",
      controller: 'templatesController'
    })
    .state('templates-manage', {
      url: "/templates/manage",
      templateUrl: "template/new_template.html",
      controller: 'templatesController'
    })
    .state('carddecks-create', {
      url: "/carddecks/create",
      templateUrl: "carddeck/new_carddeck.html",
      controller: 'cardDecksController'
    })
    .state('carddecks-manage', {
      url: "/carddecks/manage",
      templateUrl: "carddeck/new_carddeck.html",
      controller: 'cardDecksController'
    });
  });


  app.filter('range', function(){
      return function(n) {
        var res = [];
        for (var i = 0; i < n; i++) {
          res.push(i);
        }
        return res;
      };
    });
