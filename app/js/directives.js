/*jslint node: true */
/*global angular */
"use strict";

var app = angular.module("staf-web-client.directives", []);
app.directive('menus', function(){
  return {
    restrict : "E",
    templateUrl: "../templates/nav/menu.html"
  };
});
app.directive('searchBox', function(){
  return {
    restrict : "E",
    templateUrl: "../templates/nav/search.html"
  };
});
app.directive('topHeader',function(){
  return {
    restrict : "AE",
    templateUrl: "../templates/nav/header.html"
  };
});

app.directive('sidebarMenu',function(){
  return {
    restrict : "AE",
    scope: {
      'sidebarMenu' : '='
    },
    templateUrl: "../templates/nav/sidebar.html"
  };
});

app.directive('topNavBar',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/nav/nav_bar.html"
  };
});

app.directive('subMenu',function(){
  return {
    restrict : "E",
    template: "<a href=\"#{{subMenu.target}}\">{{subMenu.name}}</a>"
  };
});

app.directive('tabs',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/nav/tabs.html"
  };
});

app.directive('errorDisplay',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/common/error_display.html"
  };
}); // end of stepBlockTable

app.directive('newTestCase',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/testcase/new_test_case.html"
  };
});

app.directive('testCaseHeader',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/testcase/test_case_header.html"
  };
});

app.directive('testCaseBody',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/testcase/test_case_body.html"
  };
});

app.directive('testThread',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/testcase/test_thread.html"
  };
});

app.directive('testThreadHeader',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/testcase/test_thread_header.html"
  };
});

app.directive('testThreadBody',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/testcase/test_thread_body.html"
  };
});

app.directive('testStage',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/testcase/test_stage.html"
  };
});

app.directive('testPhases',function(){
  return {
    restrict: 'A',
    templateUrl: "../templates/testcase/test_phases.html"
  };
});

app.directive('newStepBlock',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/stepblock/new_step_block.html"
  };
});

app.directive('stepBlockHeader',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/stepblock/step_block_header.html"
  };
}); // end of stepBlockTable

app.directive('stepBlockBody',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/stepblock/step_block_body.html"
  };
}); // end of stepBlockTable

app.directive('stepBlockTable',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/stepblock/step_block_table.html"
  };
}); // end of stepBlockTable


app.directive('newVariable',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/variable/new_variable.html"
  };
});

app.directive('parameter',function(){
  return {
    restrict : "A",
    scope: {
        'parameter' : '=',
        'phaseName' : '='
    },
    templateUrl: "../templates/testcase/phase_parameter.html"
  };
});

app.directive('variableBlockHeader',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/variable/variable_block_header.html"
  };
});

app.directive('variableBlockBody',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/variable/variable_block_body.html"
  };
});

app.directive('systemVariableBlock',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/variable/system_variable_block.html"
  };
});

app.directive('userVariableBlock',function(){
  return {
    restrict : "E",
    templateUrl: "../templates/variable/user_variable_block.html"
  };
});

app.directive('newBlockButton', function(){
  return {
    restrict: 'E',
    replace : true,
    scope :{
      'func' : '='
    },
    template: '<button type="button" class="btn btn-link btn-xs" ng-click="func()"> <span class="fa fa-plus"></span> </button>'
  };
});

app.directive('blockButton', function(){
  return {
    restrict: 'E',
    scope :{
      'func' : '=',
      'block': '=',
      'type': '='
    },
    template: '<button type="button" class="btn btn-link btn-xs" ng-click="func(block)"> <span class="{{type}}"></span> </button>'
  };
});

app.directive('newBlockItemButton', function(){
  return {
    restrict: 'E',
    replace : true,
    scope :{
      'func' : '=',
      'block': '='
    },
    template: '<button type="button" class="btn btn-link btn-xs" ng-click="func(block)"> <span class="fa fa-plus"></span> </button>'
  };
});

app.directive('blockItemButton', function(){
  return {
    restrict: 'E',
    scope :{
      'func' : '=',
      'block': '=',
      'item': '=',
      'type': '='
    },
    template: '<button type="button" class="btn btn-link btn-xs" ng-click="func(block, item)"> <span class="{{type}}"></span> </button>'
  };
});

app.directive('parematerContent', function () {
    return {
        restrict: 'A',
        scope: {
            'parematerContent' : '=',
            'parameterType' : '='
        },
        link: function (scope, element, attrs, ctrl) {
          var parematerContent = element.val();
          var parameterType = "text";
          function validate(){
            var result = true;
              if(parameterType === "text"){
                result = (parematerContent.length === 0)?true:/[a-zA-Z0-9._]+(\s+)?\=(\s+)?[a-zA-Z0-9._${}"]+$/.test(parematerContent);
              }else if(parameterType === "json"){
                result = validateJson(parematerContent);
              }else if(parameterType === "xml"){
                //TODO validate xml 추가 해야함 header와 body가 있음
              }else{
                result = false;
              }

              displayValidation(result, element);
          }
          function validateJson(jsonContent){
            var result = true;
            result = (jsonContent.length === 0)?true:/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(jsonContent);
            if(result && jsonContent.length !== 0){
              try{
                JSON.parse(jsonContent);
              }catch(err){
                result = false;
              }
            }
            return result;
          }

          function displayValidation(result, elem){
            if(!result){
              elem.addClass('ng-invalid');
            }else{
              elem.removeClass('ng-invalid');
            }
          }

          element.bind('blur', function(evt) {
            validate();
            if(parematerContent.length !== 0){
              parematerContent = JSON.stringify(JSON.parse(parematerContent),null, 2);
              element.val(parematerContent);
            }
          });

          scope.$watch('parematerContent', function (newVal) {
            if(newVal !== undefined)
            parematerContent = newVal;
            validate();
          });

          scope.$watch('parameterType', function (newVal) {
            if(newVal !== undefined)
            parameterType = newVal;
            validate();
          });
        }
    };
}); // end of parematerContent

app.directive('newUserBlock',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/user/new_user_block.html"
  };
});

app.directive('newTemplateBlock',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/template/new_template_block.html"
  };
});

app.directive('newCardDeckBlock',function(){
  return {
    restrict: 'E',
    templateUrl: "../templates/carddeck/new_carddeck_block.html"
  };
});

app.directive('cardDeckPreview', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      'carddeck': '='
    },
    template:'<span>{{carddeck.common_cards}}</span>',
    link : function(scope, element, attrs, ctrl){

      scope.$watchCollection("carddeck.seatCards",function( newValue, oldValue ){
        buildPreview(scope.carddeck);
      });
      function buildPreview(cardDeck){
        var previewContent = '';
        var firstCardsOfSeats = '';
        var secondCardsOfSeats = '';
        for(var index in scope.carddeck.seatCards){
          var cards = scope.carddeck.seatCards[index].deck.split(',');
          for(var i in cards){
          }
        }
      }
    }
  };
});
