var expectedMenus = [
  { name:"TestCase",    sub_menus:[{ name: "New", target: "testcase-create"}  , {name: "Manage", target: "testcase-manage"}]},
  { name:"StepBlocks",  sub_menus:[{ name: "New", target: "stepblock-create"} , {name: "Manage", target: "stepblock-manage"}]},
  { name:"Variables",   sub_menus:[{ name: "New", target: "variable-create"}  , {name: "Manage", target: "variable-manage"}]},
  { name:"Users",       sub_menus:[{ name: "New", target: "users-create"}     , {name: "Manage", target: "users-manage"}]},
  { name:"Templates",   sub_menus:[{ name: "New", target: "templates-create"} , {name: "Manage", target: "templates-manage"}]},
  { name:"CardDeck",    sub_menus:[{ name: "New", target: "carddecks-create"} , {name: "Manage", target: "carddecks-manage"}]}
  ];


casper.test.begin('staf-web-client home', function suite(test){
  casper.start("http://localhost:9090/app/view/index.html", function(){
    test.assertTitle("staf-web-client", "title is the one expected");
  
    //test.assertSelectorHasText('li.dropdow > a', "dropdown menu is found");

  });

  casper.then(function(){

  });

  casper.run(function(){
    test.done();
  });
});
