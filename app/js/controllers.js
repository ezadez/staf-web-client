/*jslint node: true */
/*jslint nomen: true */
/*global angular, _ */
"use strict";

//(function(){
  var isWindows = function(){
      return /win/.test(navigator.userAgent.toLowerCase());
  };

  var notImplementedYet = function(){
    alert('not implemented yet');
    return;
  };

  var validator = function(){
    return {
      allowAll: ".*",
      onlyAlphabet: "[a-zA-Z]+",
      notAllowSpecialChars: "[a-zA-Z0-9]+",
      allowUnderbarAndDot: "[a-zA-Z0-9._]+",
      onlyDigits: "\\d+",
      parameter: '([a-zA-Z0-9._]+(\\s+)?\\=(\\s+)?[a-zA-Z0-9._${}"]+\\,?)+',
      json: '^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?\\}$',
      stepSeq:'[0-9]+|HOOK|hook',
      variableType: '\\$?\\{?[a-zA-Z0-9._]+\\}?',
      stepBlockParameters: '([a-zA-Z0-9_]+\\,?)+',
      directoryPath: isWindows()?'^([A-Za-z]:)?(\\\\[A-Za-z_\\-\\s0-9\\.]+)+$':'^/{1}(((/{1}\\.{1})?[a-zA-Z0-9 ]+/?)+(\\.{1}[a-zA-Z0-9]{2,4})?\\/?)$',
      urlType: '^\\w+:\\/\\/[A-Za-z0-9\\.-]{3,}\\.[A-Za-z]{3}(?:\\:\\d+)?$',
      classType:'((\\w\\.)+)?([A-Z](\\w+)?)+$',
      packageType: '(\\w+\\.?)+',
      cardDecks :'([2-9AKQJT][csdh],?(\\s+)?)+'
    };
  };
  var gBlockButtons = {
                        "delete": {"class": "fa fa-minus"},
                        "copy": {"class": "fa fa-copy"},
                        "fold": {"class": "fa fa-folder-o"},
                        "unfold": {"class": "fa fa-folder-open-o"},
                        "save": {"class": "fa fa-save"},
                        };

  var urlPatternChecker = function(){
    return {
      isCreateNew : function( /** String */ url){
        return /\/\w+\/create/.test(url);
      },
      isManage : function( /** String */ url){
        return /\/\w+\/manage/.test(url);
      }
    };
  };

  var folder = function(){
    return {
      fold : function(/** Object */ obj){
        if(obj.showDetail !== undefined){
          obj.showDetail = false;
        }
      },
      unfold : function(/** Object */ obj){
        if(obj.showDetail !== undefined){
          obj.showDetail = true;
        }
      }
    };
  };

  var deleteFromArray = function(/** Array*/ sourceArray, /** Element*/ item){
    if(sourceArray.length === 1){
      return false;
    }
    var index = item;
    if(typeof(item) !== 'number'){
      index = sourceArray.indexOf(item);
    }
    if(index < 0) return;
    sourceArray.splice(index, 1);
    return true;
  };

  var getItemFrom = function(arrBlock, item){
    var target = item;
    if(typeof(item) === 'number'){
      target = arrBlock[item];
    }
    return target;
  };

  var getCopiedItem = function(arrBlock, item){
    var copied;
    var source = getItemFrom(arrBlock, item);
    copied = angular.copy(source);
    return copied;
  };

  var errorDisplay = function(){

    return {
        display : function(_scope, _timeout, message){
          _scope.error = message;
          _timeout(function(){
            _scope.error = "";
            //_timeout.flush();
          }, 3000);
        }
    };
  };

  var app = angular.module("staf-web-client.controllers",
    ['ngRoute',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'ui.grid.resizeColumns']
  );
  app.controller('menuController',function($scope, $route, $routeParams, $location, menuService){
    $scope.menus = menuService.get();
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    
  });

  app.controller('dashboardController',function($scope, $route, $routeParams, $location){
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
  });

  app.controller("testCaseController", function($scope, $routeParams, $location , $timeout, testCaseService, stepBlockService){
    $scope.error = "";

    $scope.loadTestCases = function(testCaseService){
      var testCases = [];
      if(urlPatternChecker().isCreateNew($location.url())){
        testCases.push(testCaseService.getEmtpyTestCase());
      }else if(urlPatternChecker().isManage($location.url())){
        testCases = testCaseService.loadTestCases();
      }
      return testCases;
    };

    $scope.saveTestCase = function(/** TestCase */ testCase){
        notImplementedYet();
    };

    $scope.newTestCase = function(){
        $scope.testCases[$scope.testCases.length -1].showDetail = false;
        $scope.testCases.push(testCaseService.getEmtpyTestCase());
    };

    $scope.addTestCase = function(/** TestCase */ testCase){
        $scope.testCases.push(testCase);
    };

    $scope.copyTestCase = function(/** TestCase */ source){
      $scope.testCases[$scope.testCases.length -1].showDetail = false;
      var copiedTestCase = $.extend(true, {}, source);
      copiedTestCase.id = source.id + "_copied";
      copiedTestCase.showDetail = true;
      $scope.testCases.push(copiedTestCase);
    };

    $scope.deleteTestCase = function(/** TestCase */ testCase){
      var result = deleteFromArray( $scope.testCases, testCase);
      if(!result){
        errorDisplay().display($scope, $timeout, "Can NOT removed, since there is at least one TestCase");
      }
      $scope.testCases[$scope.testCases.length -1].showDetail = true;
    };

    $scope.foldTestCase = function(/** TestCase */ testCase){
      folder().fold(testCase);
    };

    $scope.unfoldTestCase = function(/** TestCase */ testCase){
      folder().unfold(testCase);
    };

    $scope.newTestThread = function(/** TestCase */ testCase){
      testCase.Threads.push(testCaseService.getEmptyThread());
    };

    $scope.copyTestThread = function(/** TestCase*/ testCase, /**Thread */ source){
      var copiedTestThread = $.extend(true, {}, source);
      copiedTestThread.id = source.id + "_copied";
      testCase.Threads.push(copiedTestThread);
    };

    $scope.deleteTestThread = function(/** TestCase*/ testCase, /**Thread */ testThread){
      var result = deleteFromArray( testCase.Threads, testThread);
      if(!result){
        errorDisplay().display($scope, $timeout, "Can NOT removed, since there is at least one TestThread");
      }
    };

    $scope.addTestStage = function(/** Thread */ testThread, /** TestStage */ testStage){
      testThread.Stages.push(testStage);
    };
    $scope.newTestStage = function(/** Thread */ testThread){
      $scope.addTestStage(testThread, testCaseService.getEmptyTestStage());
    };

    $scope.copyTestStage = function(/** Thread */ testThread, /** TestStage */ source){
      var copiedTestStage = $.extend(true, {}, source);
      copiedTestStage.seq = source.seq + 1;
      $scope.addTestStage(testThread, copiedTestStage);
    };

    $scope.deleteTestStage = function(/** Thread */ testThread, /** TestStage */ testStage){
      var result = deleteFromArray( testThread.Stages, testStage);
      if(!result){
        errorDisplay().display($scope, $timeout, "Can NOT removed, since there is at least one TestStage");
      }
    };

    $scope.addStepBlock = function(/** StepBlocks */ phaseStepBlocks, /** stepBlock*/ stepBlock){
      var existStepBlockIds = stepBlockService.getStepBlockIds();
      if(existStepBlockIds.length < 1 || existStepBlockIds.indexOf(stepBlock.id) < 0){
        stepBlock.notExist = true;
      }
      phaseStepBlocks.push(stepBlock);
    };

    $scope.addStepBlockByEnterKey = function(/** Event */ event, /** StepBlocks */ stepBlocks){
      if (event.which === 13){
        var newStepBlock = {};
        var newStepBlockId = event.srcElement.value;
        if(newStepBlockId === "") return;
        newStepBlock.id = newStepBlockId;
        $scope.addStepBlock(stepBlocks, newStepBlock);

        event.srcElement.value = "";
      }
    };

    $scope.moveToNewStepBlock = function(){
      notImplementedYet();
    };

    $scope.viewPhaseStepBlock = function(){
      notImplementedYet();
    };

    $scope.editPhaseStepBlock = function(){
      notImplementedYet();
    };

    $scope.getStepBlockIds = function(/** String*/ inputStepBlockId){
      return stepBlockService.getStepBlockIds();
    };

    $scope.removePhaseStepBlock = function(/** StepBlocks */ phaseStepBlocks, /** stepBlock*/ stepBlock){
      var result = deleteFromArray(phaseStepBlocks, stepBlock);
    };

    $scope.testCases = $scope.loadTestCases(testCaseService);
    $scope.validatorRegEx = validator;
    $scope.params = $routeParams;

  });

  app.controller("stepBlockController", function($scope, $routeParams, $location , $timeout, stepBlockService){

    $scope.validatorRegEx = validator;
    $scope.params = $routeParams;
    $scope.stepBlocks = [];
    $scope.initialStepSize = 3;
    $scope.blockButtons = gBlockButtons;

    var addInitSteps = function(/**Array */ stepBlock){
      if(stepBlock.steps.length != $scope.initialStepSize){
        for(var i= stepBlock.steps.length; i < $scope.initialStepSize; i++){
          stepBlock.steps.push(JSON.parse(JSON.stringify(stepBlock.steps[0])));
        }
        for(var j = 0 ; j < stepBlock.steps.length; j++){
          stepBlock.steps[j].seq = j + 1;
        }
      }
    };

    $scope.loadStepBlocks = function(stepBlockService){
      var stepBlocks = [];
      if(urlPatternChecker().isCreateNew($location.url())){
        stepBlocks = stepBlockService.loadEmtpyStepBlocks();
        addInitSteps(stepBlocks[0]);
      }else if(urlPatternChecker().isManage($location.url())){
        stepBlocks = stepBlockService.loadStepBlocks();
      }
      return stepBlocks;
    };

    $scope.addStep = function(/** stepBlock */ stepBlock, /** step */ step){
      stepBlock.steps.push(step);
    };

    $scope.newStep = function(/** stepBlock */ stepBlock){
      var newStep = $.extend(true, {}, stepBlockService.loadEmptyStep());
      newStep.seq = stepBlock.steps[stepBlock.steps.length -1].seq + 1 ;
      stepBlock.steps.push(newStep);
    };

    $scope.deleteStep = function(/** stepBlock */ stepBlock, /** step */ step){
      var result = deleteFromArray(stepBlock.steps, step);

      if(!result){
        errorDisplay().display($scope, $timeout, "Can NOT removed, since there is at least one step");
      }
    };

    $scope.copyStep = function(/** stepBlock */ stepBlock, /** step */ source){
      var copiedStep = $.extend(true, {}, source);
      copiedStep.seq = stepBlock.steps[stepBlock.steps.length -1].seq + 1 ;
      stepBlock.steps.push(copiedStep);
    };

    $scope.addStepBlock = function(/** StepBlock */ stepBlock){
      $scope.stepBlocks.push(stepBlock);
    };

    $scope.newStepBlock = function(){
      var newStepBlock = $.extend(true, {}, stepBlockService.loadEmptyStepBlock());
      newStepBlock.id = "_new";
      $scope.addStepBlock(newStepBlock);
      addInitSteps(newStepBlock, 1);
    };

    $scope.copyStepBlock = function(/** StepBlock */ source){
      var copiedStepBlock = $.extend(true, {}, source);
      copiedStepBlock.id = source.id + "_copied";
      copiedStepBlock.showDetail = true;
      $scope.addStepBlock(copiedStepBlock);
    };

    $scope.deleteStepBlock = function(/** StepBlock */ stepBlock){
      var result = deleteFromArray($scope.stepBlocks, stepBlock);
      if(!result){
        errorDisplay().display($scope, $timeout, "Can NOT removed, since there is at least one StepBlock");
      }

      $scope.stepBlocks[$scope.stepBlocks.length -1].showDetail = true;
    };

    $scope.foldStepBlock = function(/** StepBlock */ stepBlock){
      folder().fold(stepBlock);
    };

    $scope.unfoldStepBlock = function(/** StepBlock */ stepBlock){
      folder().unfold(stepBlock);
    };

    $scope.getTemplateIds = function(val){
      return stepBlockService.getTemplateIds(val);
    };
    $scope.getAvailableUsers = function(val){
      return stepBlockService.getAvailableUsers(val);
    };
    $scope.getActionNames = function(val){
      return stepBlockService.getActionNames(val);
    };

    $scope.getAvailableTargets = function(val){
      return stepBlockService.getAvailableTargets(val);
    };

    $scope.saveStepBlock = function(stepBlock){
      alert("not implemented");
    };


    $scope.stepBlocks = $scope.loadStepBlocks(stepBlockService);

  });  // end of stepBlockController

  app.controller("variableController", function($scope, $routeParams, $location, variableService, $timeout){
    $scope.params = $routeParams;
    $scope.variableBlocks = [];
    $scope.variableBlockTypes = variableService.getVariableBlockTypes();

    $scope.loadVariableBlocks = function(){
      if(urlPatternChecker().isCreateNew($location.url())){
        var newVariableBlock = variableService.getEmptyVariableBlock();
        newVariableBlock.system_variables = $scope.getSystemVariableList();
        newVariableBlock.variables = [{"name":"", "type":"string", "pattern": validator().allowUnderbarAndDot}];
        $scope.variableBlocks.push(newVariableBlock);

      }else if(urlPatternChecker().isManage($location.url())){
        $scope.variableBlocks = variableService.loadNewVariableBlocks();
      }

    };
    $scope.getSystemVariableList = function(){
      var systemVariables = variableService.getSystemVariableList();
      $scope.buildVariablesPattern(systemVariables);
      return systemVariables;
    };

    $scope.buildVariablesPattern = function(/** Variable Array */ variables){
      for(var index in variables){
        $scope.buildVariablePattern(variables[index]);
      }
    };

    $scope.buildVariablePattern = function(/** Variable */ variable){
        if(variable.type === 'number') variable.pattern = validator().onlyDigits;
        else if(variable.type === 'path') variable.pattern = validator().directoryPath;
        else if(variable.type === 'url') variable.pattern = validator().urlType;
        else if(variable.type === 'class') variable.pattern = validator().classType;
        else if(variable.type === 'string') variable.pattern = validator().allowUnderbarAndDot;
    };

    $scope.addVariableBlock = function(/** variableBlock */ variableBlock){
      $scope.variableBlocks.push(variableBlock);
    };

    $scope.newVariableBlock = function(){
      var newVariableBlock = variableService.getEmptyVariableBlock();
      newVariableBlock.id = "_new";
      newVariableBlock.variables = [{"name":"", "type":"string", "pattern": validator().allowUnderbarAndDot}];
      newVariableBlock.system_variables = $scope.getSystemVariableList();
      $scope.addVariableBlock(newVariableBlock);
    };

    $scope.deleteVariableBlock = function(/** variableBlock */ variableBlock){
      var result = deleteFromArray($scope.variableBlocks, variableBlock);
      if(!result){
        errorDisplay().display($scope, $timeout, "Can NOT removed, since there is at least one Variable Block");
      }

      $scope.variableBlocks[$scope.variableBlocks.length -1].showDetail = true;
    };



    $scope.addUserVariable = function(/** variable */ variable){
      $scope.userDefinedVariables.push(variable);
    };

    $scope.newVariable = function(/** variableBlock */ variableBlock){
      variableBlock.variables.push({"name":"", "type":"string", "pattern": validator().allowUnderbarAndDot});
    };

    $scope.copyVariable = function(/** variableBlock */ variableBlock, /** Variable */ variable){
      variableBlock.variables.push(angular.copy(variable));
    };

    $scope.deleteVariable = function(/** variableBlock */ variableBlock, /** Variable */ variable){
      var result = deleteFromArray(variableBlock.variables, variable);
    };

    $scope.foldVariableBlock = function(/** variableBlock */ variableBlock){
      folder().fold(variableBlock);
    };

    $scope.unfoldVariableBlock = function(/** variableBlock */ variableBlock){
      folder().unfold(variableBlock);
    };

    $scope.loadVariableBlocks();
    $scope.validatorRegEx = validator;
    $scope.variableTypes = variableService.getVariableTypes();
  });


  app.controller("usersController", function($scope, $routeParams, $location,  $timeout, userService){
    $scope.params = $routeParams;
    $scope.userBlocks = [];
    $scope.userBlock = userService.getEmptyUserBlock();
    $scope.userColumns = userService.getDefaultUserColumns();

    $scope.loadUserBlocks = function(){
      if(urlPatternChecker().isCreateNew($location.url())){
        $scope.userBlocks = userService.loadNewUserBlocks();
        $scope.userBlocks[0].count = $scope.userBlocks[0].users.length;

      }else if(urlPatternChecker().isManage($location.url())){
        $scope.userBlocks = userService.loadUserBlocks();
      }
    };
    $scope.addUserBlock = function(userBlock){
      $scope.userBlocks.push(userBlock);
    };

    $scope.newUserBlock = function(){
      var newUserBlock = userService.getNewUserBlock();
      $scope.addUserBlock(newUserBlock);
    };

    $scope.deleteUserBlock = function(userBlock){
      var result = deleteFromArray($scope.userBlocks, userBlock);
    };
    $scope.copyUserBlock = function(userBlock){
      var copiedUserBlock = angular.copy(userBlock);
      $scope.addUserBlock(copiedUserBlock);
    };

    $scope.unfoldUserBlock = function(userBlock){
      folder().unfold(userBlock);
    };

    $scope.foldUserBlock = function(userBlock){
      folder().fold(userBlock);
    };

    $scope.addUser = function(userBlock, user){
      userBlock.users.push(user);
      userBlock.count = userBlock.users.length;
    };

    $scope.initUserAttributes = function(userBlock, user){
      for(var col in $scope.userColumns){
        if($scope.userColumns[col].name === "name"){
          user[$scope.userColumns[col].name] = userBlock.name_prefix+'';
        }else{
          user[$scope.userColumns[col].name] = '';
        }

      }
    };

    $scope.newUser = function(userBlock){
      var newUser = {};
      $scope.initUserAttributes(userBlock, newUser);
      $scope.addUser(userBlock, newUser);
    };

    $scope.deleteUser = function(userBlock, user){
      var result = deleteFromArray(userBlock.users, user);
      userBlock.count = userBlock.users.length;
    };

    $scope.copyUser = function(userBlock, source){
      var copiedUser = angular.copy(source);
      $scope.addUser(userBlock, copiedUser);
    };

    $scope.addUserAttribute = function(){
      var userAttribute = {};
      userAttribute.name = "";
      userAttribute.colSize = 5;
      $scope.userColumns.push(userAttribute);
    };

    $scope.removeLastUserAttribute = function(){
      var userAttribute = {};
      userAttribute.name = "";
      userAttribute.colSize = 5;
      if($scope.userColumns.length === 2){
        errorDisplay().display($scope, $timeout, "Cannot remove default attributes");
        return;
      }
      var index = $scope.userColumns.length -1;
      $scope.userColumns.splice(index, 1);
    };

    $scope.backUpPrefix = "";
    $scope.addUserPrefix = function(userBlock){
      var prefix = userBlock.name_prefix;

      for(var index in userBlock.users){
        var userName = userBlock.users[index].name;
        var newUserName = prefix + userName.replace($scope.backUpPrefix,"");
        userBlock.users[index].name = newUserName;
      }
      if($scope.backUpPrefix !== prefix){
        $scope.backUpPrefix = prefix;
      }
    };

    $scope.addUsers = function(userBlock){
        var userCountInBlock = userBlock.count;
        var currentUserCount = userBlock.users.length;
        if(currentUserCount > userCountInBlock){
          for(var i=userBlock.users.length;i>userCountInBlock;i--){
            $scope.deleteUser(userBlock, userBlock.users[i-1]);
          }
        }else{
          for(var j=userBlock.users.length;j<userCountInBlock;j++){
            $scope.newUser(userBlock);
          }
        }
    };

    $scope.loadUserBlocks();
  });

  app.controller("templatesController", function($scope, $routeParams, $location, templateService){
    $scope.params = $routeParams;
    $scope.validatorRegEx = validator;
    $scope.templateBlocks = [];
    $scope.blockButtons = gBlockButtons;

    $scope.loadTemplateBlocks = function(){
      if(urlPatternChecker().isCreateNew($location.url())){
        $scope.templateBlocks = templateService.getNewTemplateBlocks();
      }else if(urlPatternChecker().isManage($location.url())){
        $scope.templateBlocks = templateService.loadTemplateBlocks();
      }
    };

    $scope.addTemplateBlock = function(templteBlock){
      $scope.templateBlocks.push(templteBlock);
    };

    $scope.newTemplateBlock = function(){
      var newTemplateBlock = templateService.getNewTemplateBlock();
      $scope.addTemplateBlock(newTemplateBlock);
    };

    $scope.deleteTemplateBlock = function(templateBlock){
      var result = deleteFromArray($scope.templateBlocks, templateBlock);
    };

    $scope.copyTemplateBlock = function(templateBlock){
      var copiedTemplateBlock = angular.copy(templateBlock);
      $scope.addTemplateBlock(copiedTemplateBlock);
    };

    $scope.unfoldTemplateBlock = function(templateBlock){
      folder().unfold(templateBlock);
    };

    $scope.foldTemplateBlock = function(templateBlock){
      folder().fold(templateBlock);
    };

    $scope.saveTemplateBlock = function(templateBlock){
      alert("not implemented yet");
    };

    $scope.addTemplate = function(templateBlock, templteMessage){
      templateBlock.templates.push(templteMessage);
    };

    $scope.newTemplate = function(templateBlock){
      var newTemplate = templateService.getNewTemplate();
      $scope.addTemplate(templateBlock, newTemplate);
    };

    $scope.deleteTemplate = function(templateBlock, templateMessage){
      var result = deleteFromArray(templateBlock.templates, templateMessage);
    };

    $scope.copyTemplate = function(templateBlock, templateMessage){
      folder().fold(templateBlock.templates[templateBlock.templates.length -1]);
      var copiedTemplate = getCopiedItem(templateBlock.templates, templateMessage);
      copiedTemplate.id = "_copied";
      $scope.addTemplate(templateBlock, copiedTemplate);
      folder().unfold(templateBlock.templates[templateBlock.templates.length -1]);
    };

    $scope.unfoldTemplate = function(templateBlock, templateMessage){
      folder().unfold(getItemFrom(templateBlock.templates, templateMessage));
    };
    $scope.foldTemplate = function(templateBlock, templateMessage){
      folder().fold(getItemFrom(templateBlock.templates, templateMessage));
    };

    $scope.saveTemplate = function(templateBlock, templateMessage){
      var templateToSave = templateMessage;

      alert("not implemented yet");
    };


    $scope.loadTemplateBlocks();
  }); // end of templatesController

  app.controller("cardDecksController", function($scope, $routeParams, $location, $timeout, cardDeckService){
    $scope.params = $routeParams;
    $scope.cardDeckBlocks = [];
    $scope.validatorRegEx = validator;
    $scope.blockButtons = gBlockButtons;

    $scope.loadCardDeckBlocks = function(){
      if(urlPatternChecker().isCreateNew($location.url())){
        $scope.cardDeckBlocks = cardDeckService.getNewCardDeckBlocks();
      }else if(urlPatternChecker().isManage($location.url())){
        $scope.cardDeckBlocks = cardDeckService.loadCardDeckBlocks();
      }
    };


    $scope.addCardDeckBlock = function(cardDeckBlock){
      $scope.cardDeckBlocks.push(cardDeckBlock);
    };

    $scope.newCardDeckBlock = function(){
      var newcardDeckBlock = cardDeckService.getNewCardDeckBlock();
      $scope.addCardDeckBlock(newcardDeckBlock);
    };

    $scope.deleteCardDeckBlock = function(cardDeckBlock){
      var result = deleteFromArray($scope.cardDeckBlocks, cardDeckBlock);
    };

    $scope.copyCardDeckBlock = function(cardDeckBlock){
      var copiedCardDeckBlock = angular.copy(cardDeckBlock);
      copiedCardDeckBlock.id = cardDeckBlock.id + "_copied";
      $scope.addCardDeckBlock(copiedCardDeckBlock);
    };

    $scope.unfoldCardDeckBlock = function(cardDeckBlock){
      folder().unfold(cardDeckBlock);
    };

    $scope.foldCardDeckBlock = function(cardDeckBlock){
      folder().fold(cardDeckBlock);
    };

    $scope.saveCardDeckBlock = function(cardDeckBlock){
      alert("not implemented yet");
    };

    $scope.addCardDeck = function(cardDeckBlock, cardDeck){
      cardDeckBlock.cardDecks.push(cardDeck);
    };

    $scope.newCardDeck = function(cardDeckBlock){
      var newCardDeck = cardDeckService.getNewCardDeck();
      $scope.addCardDeck(cardDeckBlock, newCardDeck);
    };

    $scope.deleteCardDeck = function(cardDeckBlock, cardDeck){
      var result = deleteFromArray(cardDeckBlock.cardDecks, cardDeck);
    };

    $scope.copyCardDeck = function(cardDeckBlock, cardDeck){
      folder().fold(cardDeckBlock.cardDecks[cardDeckBlock.cardDecks.length -1]);
      var copiedCardDeck = getCopiedItem(cardDeckBlock.cardDecks, cardDeck);
      copiedCardDeck.id = "_copied";
      $scope.addCardDeck(cardDeckBlock, copiedCardDeck);
      folder().unfold(cardDeckBlock.cardDecks[cardDeckBlock.cardDecks.length -1]);
    };

    $scope.unfoldCardDeck = function(cardDeckBlock, cardDeck){
      folder().unfold(getItemFrom(cardDeckBlock.cardDecks, cardDeck));
    };
    $scope.foldCardDeck = function(cardDeckBlock, cardDeck){
      folder().fold(getItemFrom(cardDeckBlock.cardDecks, cardDeck));
    };

    $scope.saveCardDeck = function(cardDeckBlock, cardDeck){
      alert("not implemented yet");
    };

    $scope.addSeatCard = function(cardDeck, seatCard){
      cardDeck.seatCards.push(seatCard);
    };

    $scope.newSeatCard = function(cardDeck){
      var lastSeatCard = cardDeck.seatCards[cardDeck.seatCards.length -1];
      var newSeatCard = {"seat":(Number(lastSeatCard.seat) + 1), "deck":""};
      $scope.addSeatCard(cardDeck, newSeatCard);
    };

    $scope.reArrangeSeatOfSeatCardDecks = function(cardDeck){
      for(var index in cardDeck.seatCards){
        var seatCard = cardDeck.seatCards[index];
        seatCard.seat = index;
      }
    };

    $scope.deleteSeatCard  = function(cardDeck, seatCard){
      var result = deleteFromArray(cardDeck.seatCards, seatCard);
      $scope.reArrangeSeatOfSeatCardDecks(cardDeck);
    };

    $scope.copySeatCard = function(cardDeck, seatCard){
      var copiedSeatCard = getCopiedItem(cardDeck.seatCards, seatCard);
      var lastSeatCard = cardDeck.seatCards[cardDeck.seatCards.length -1];
      copiedSeatCard.seat = (Number(lastSeatCard.seat) + 1);
      $scope.addSeatCard(cardDeck, copiedSeatCard);

    };

    $scope.loadCardDeckBlocks();

  });
