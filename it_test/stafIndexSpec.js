// spec.js

describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8090/app/view/staf-index.html');

    expect(browser.getTitle()).toEqual('staf-web-client');
    //
    //var testCaseMenu = element.all(by.css('.dropdown li')).first().$('a');
    //expect(testCaseMenu.getText()).toBe('TestCase');
    var expectedMenus = ['TestCase','StepBlocks','Variables','Users','Templates','CardDeck'];
    var expectedSubMenu = ['New','Manage','New','Manage','New','Manage','New','Manage','New','Manage','New','Manage'];
    element.all(by.repeater('menu in menus')).each(function(elem, index){
      expect(elem.$('a').getText()).toBe(expectedMenus[index]);
      elem.$('a').click();
      expect(hasClass(elem), 'open').toBe(true);
      elem.all(by.repeater('subMenu in menu.sub_menus')).each(function(subElem, subIndex){
        elem.$('a').click();

        //expect(subElem.$('a').getText()).toBe(expectedSubMenu[subIndex]);
      });
    });

    expect(element(By.linkText('New')).isPresent()).toBe(true);
    /*

    var expectedSubMenuSize = 12;

    element.all(by.repeater('subMenu in menu.sub_menus')).each(function(elem, index){
      //console.log('actualSubMenuSize >> '+ actualSubMenuSize);
      expect(elem.$('a').getAttribute('href')).toBe("");
      //expect(elem.$('a').getText()).toBe(expectedSubMenu[index]);
    });

    */
  });
});

var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};
