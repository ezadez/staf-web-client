module.exports = function(config){
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'libs/jquery/dist/jquery.js',
      'libs/angular/angular.js',
      'libs/angular-route/angular-route.min.js',
      'libs/jquery.cookie/jquery.cookie.js',
      'libs/dcjqaccordion/js/jquery.dcjqaccordion.2.7.min.js',
      'libs/jquery.nicescroll/jquery.nicescroll.min.js',
      'libs/jquery.scrollTo/jquery.scrollTo.min.js',
      'libs/angular-ui-router/release/angular-ui-router.min.js',
      'libs/angular-ui-grid/ui-grid.min.js',
      'libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'libs/angular-bootstrap/ui-bootstrap.min.js',
      'libs/angular-mocks/angular-mocks.js',
      'libs/lodash/lodash.js',
      'libs/underscore.string/dist/underscore.string.js',
      'libs/angular-underscore/angular-underscore.min.js',
      'libs/angular-underscore-string/angular-underscore-string.js',
      'app/**/*.js',
      'tests/*.js',
      'app/templates/**/*.html',
    ], // end of files
    //preprocessors: {
      //'app/templates/**/*.html': 'ng-html2js'
    //},
    reporters: ['progress'],
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ]
  });
};
