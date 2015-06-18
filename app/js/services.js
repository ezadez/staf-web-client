/*jslint node: true */
/*global angular, localStorage */
"use strict";

var testStepBlockIds = ["cash_game_login" ,"small_blind_run", "big_blind_run", "tearDownStepBlock1", "setUpStepBlock1", "testTargetStepBlock1"];
var testTemplateIds = ["egn/login" ,"rest/login" ,"egn/logout", "enter", "leave", "check", "raise"];
var testActionNames = ["egn_send","egn_receive","run", "storage_wait"];
var testTargetServers = ["egn_server","rest_server"];

//TODO: if possible, then implement multi-level drop down
var app = angular.module("staf-web-client.services",[]);
app.factory("menuService",function(){
    var menus = [
        { name:"Dashboard",   target: "dashboard", sub_menus:[{ name: "dashboard", target: "dashboard"}]},
        { name:"TestCase",    target: "", sub_menus:[{ name: "New", target: "testcase-create"}  , {name: "Manage", target: "testcase-manage"}]},
        { name:"StepBlocks",  target: "", sub_menus:[{ name: "New", target: "stepblock-create"} , {name: "Manage", target: "stepblock-manage"}]},
        { name:"Variables",   target: "", sub_menus:[{ name: "New", target: "variable-create"}  , {name: "Manage", target: "variable-manage"}]},
        { name:"Users",       target: "", sub_menus:[{ name: "New", target: "users-create"}     , {name: "Manage", target: "users-manage"}]},
        { name:"Templates",   target: "", sub_menus:[{ name: "New", target: "templates-create"} , {name: "Manage", target: "templates-manage"}]},
        { name:"CardDeck",    target: "", sub_menus:[{ name: "New", target: "carddecks-create"} , {name: "Manage", target: "carddecks-manage"}]}
      ];
    var factory = {};
    factory.get = function(){
      return menus;
    };
    return factory;
});

var emptyTestStage = {
  "seq": 1,
  "Phases":[{ "name": "setUp",      "stepBlocks": [{"id":"","notExist":false}], "parameter":{"type": "text", "content": ""}},
            { "name": "testTarget", "stepBlocks": [{"id":"","notExist":false}], "parameter":{"type": "text", "content": ""}},
            { "name": "tearDown",   "stepBlocks": [{"id":"","notExist":false}], "parameter":{"type": "text", "content": ""}}
  ],
  "parmaters": []
};

var emptyThread = {
  "id": "",
  "Stages": [emptyTestStage]
};

app.factory("testCaseService", function(){
  return {
    //TODO: get test case from remote server
    loadTestCases: function(){
      return [];
    },
    //TODO: get test case from remote server
    loadTestCase : function(){
      return {};
    },
    getEmptyTestStage : function(){
      return angular.copy(emptyTestStage);
    },
    getEmptyThread :function(){
      return angular.copy(emptyThread);
    },
    getEmtpyTestCase: function(){
      var newEmptyThread = angular.copy(emptyThread);
      return {
        "package": "",
        "id": "",
        "showDetail":true,
        "assertion": "",
        "Threads":[newEmptyThread]
      };
    }
    /*
    //TODO
    saveTestCase : function( testCase){

    }
    */
  };
});  // end of testCaseService

var emptyStep = {
    "seq": 1,
    "user": "",
    "action": "",
    "target": "",
    "templateId": "",
    "parameter":{"type": "text", "content": ""},
    "delay": "0",
    "timeout": "0",
    "comment": ""
  };
var emptyStepBlock = {"id":"", "package":"", "showDetail": true, "parameters":[], "steps": [emptyStep]};


var SYSTEM_USERS = ["${CURRENT_USER}", "${ALL_EXCEPT_CURRENT}", "${ALL_USER}","${PLAY_USERS}", "${PLAY_EXCEPT_CURRENT}"];

app.factory("stepBlockService", function(){
  return {

    loadEmtpyStepBlocks: function(){
      return [angular.copy(emptyStepBlock)];
    },

    //TODO: get test case from remote server
    loadStepBlocks: function(){
      return [emptyStepBlock];
    },
    loadEmptyStepBlock : function(){
      return angular.copy(emptyStepBlock);
    },
    //TODO: get test case from remote server
    loadStepBlock : function(){
      return emptyStepBlock;
    },
    loadEmptyStep : function(){
      return angular.copy(emptyStep);
    },
    //TODO get stepBlockIds from server
    getStepBlockIds: function(val){
      return testStepBlockIds;
    },

    //TODO get stepBlockIds from server
    getTemplateIds : function(val){
      return testTemplateIds;
    },

    //TODO get saved users in current test case + SYSTEM_USERS
    getAvailableUsers : function(val){
      return SYSTEM_USERS;
    },

    getActionNames : function(val){
      return testActionNames;
    },

    getAvailableTargets : function(val){
      return testTargetServers;
    }
  };
});  // end of stepBlockService

var SYSTEM_VARIBLES = [
  {"name": "TESTCASE_TIMEOUT_IN_SEC",         "type": "number",   "deprecated": false,  "unit": "seconds", "pattern":""},
  {"name": "DEFAULT_STEP_TIMEOUT_IN_SEC",     "type": "number",   "deprecated": false,  "unit": "seconds", "pattern":""},
  {"name": "DEFAULT_HOOK_TIMEOUT_IN_SEC",     "type": "number",   "deprecated": false,  "unit": "seconds", "pattern":""},
  {"name": "DEFAULT_DELAY_IN_MSEC",           "type": "number",   "deprecated": false,  "unit": "milli-seconds", "pattern":""},
  {"name": "DEFAULT_TEMPLATE_FOLDER",         "type": "path" ,    "deprecated": false, "pattern":""},
  {"name": "TEMPLATE_ROOT_PATH",              "type": "path" ,    "deprecated": false, "pattern":""},
  {"name": "DEFAULT_TARGET",                  "type": "url" ,     "deprecated": false, "pattern":""},
  {"name": "STEP_FACTORY_CLASS",              "type": "class" ,   "deprecated": false, "pattern":""},
  {"name": "REPORT_BUILDER_CLASS",            "type": "class" ,   "deprecated": false, "pattern":""},
  {"name": "MESSAGE_POST_PROCESSOR_CLASS",    "type": "class" ,   "deprecated": false, "pattern":""},
  {"name": "ASSERT_POST_PROCESSOR_CLASS",     "type": "class",    "deprecated": false, "pattern":""},
  {"name": "SCENARIO_DESCRIPTION_SHEET_NAME", "type": "string" ,  "deprecated": false, "pattern":""}
];

var VARIBLE_TYPES = ["string", "number", "path", "class" ,"url"];
var emtpyVariableBlock = {
  "package": "",
  "id": "",
  "showDetail": true,
  "type": "USER-DEFINED", /* SYSTEM or user-defined*/
  "variables":[],
  "system_variables":[]
};
var /** constant */ SYSTEM_VARIBLE_TYPE = "SYSTEM";
var /** constant */ USER_DEFINED_VARIABLE_TYPE = "USER-DEFINED";

var VARIABLE_BLOCK_TYPE = ["SYSTEM", "USER-DEFINED"];
app.factory("variableService", function(){
  return {
    loadNewVariableBlocks : function(){
      var newVariableBlocks = angular.copy(emtpyVariableBlock);
      newVariableBlocks.system_variables = this.getSystemVariableList();
      /*
      if(type === SYSTEM_VARIBLE_TYPE){
        newVariableBlocks.variables = angular.copy(SYSTEM_VARIBLES);
      }
      */
      return [newVariableBlocks];
    },
    getEmptyVariableBlock : function(){
      return angular.copy(emtpyVariableBlock);
    },
    getVariableBlockTypes : function(){
      return [SYSTEM_VARIBLE_TYPE, USER_DEFINED_VARIABLE_TYPE];
    },
    getSystemVariableList : function(){
      return angular.copy(SYSTEM_VARIBLES);
    },
    getVariableTypes : function(){
      return VARIBLE_TYPES;
    }
  };
});  // end of variableService

var emtpyUserBlock = {"package":"", "id":"", "count":0 , "showDetail":true, "name_prefix":"", "users": [] };
var defaultUseColums = [
                        {"name" : "name", "default": true , "tooltip":"name", "colSize": 5},
                        {"name": "manual", "default": true, "tooltip":"manual(Y/N)","colSize": 5}
                      ];
var defaultUser = {"name": "", "manual": "N"};
app.factory("userService", function(){
  return {
    loadNewUserBlocks : function(){
      return [this.getNewUserBlock()];
    },
    getNewUserBlock : function(){
      var newUserBlock = this.getEmptyUserBlock();
      newUserBlock.users.push(angular.copy(defaultUser));
      return newUserBlock;
    },
    loadUserBlocks : function(){
      //TODO: get user-blocks from server
    },
    getEmptyUserBlock : function(){
      return angular.copy(emtpyUserBlock);
    },
    getDefaultUserColumns : function(){
      return angular.copy(defaultUseColums);
    },
    saveUserBlocks : function(){

    },
    saveUserBlock : function(){

    }
  };
}); // end of userService

var defaultTemplate = {
  "id":"",
  "showDetail": true,
  "message": {
    "header":"",
    "body":{
      "type" : "text",
      "content":""
    }
  }
};

var defaultTemplateBlock = {
  "package":"",
  "showDetail": true,
  "templates":[defaultTemplate]
};

app.factory("templateService", function(){
  return {
    getNewTemplate : function(){
      return angular.copy(defaultTemplate);
    },
    getNewTemplateBlock : function(){
      return angular.copy(defaultTemplateBlock);
    },
    getNewTemplateBlocks : function(){
      return [this.getNewTemplateBlock()];
    },
    //TODO : load template from server
    loadTemplateBlock : function(/** String */ templateId){

    },
    loadTemplateBlocks : function(/** String */ templatePackage){

    }
  };
});  // end of templateService

var defultCardDeck = {
  "id":"",
  "showDetail": true,
  "each_cards": "",
  "common_cards": "",
  "seatCards":[
    {
      "seat":"0",
      "deck":""
    },
    {
      "seat":"1",
      "deck":""
    }
  ],
  "preview": ""
};

var defaultCardDeckBlock = {
  "package":"",
  "id":"",
  "showDetail": true,
  "cardDecks":[defultCardDeck]
};

app.factory("cardDeckService", function(){
  return {
    getNewCardDeck : function(){
      return angular.copy(defultCardDeck);
    },
    getNewCardDeckBlock : function(){
      return angular.copy(defaultCardDeckBlock);
    },
    getNewCardDeckBlocks : function(){
      return [this.getNewCardDeckBlock()];
    },
    //TODO : load template from server
    loadCardDeckBlock : function(/** String */ cardDeckBlockId){

    },
    loadCardDeckBlocks : function(/** String */ cardDeckPackage){

    }
  };
});  // end of templateService
