'use strict';

//Setting up route
// Routes are specified here as part of the 'mean' module (/public/js/app.js)
// $stateProvider and $urlRouterProvider are from AngularUI Router (/app/views/includes/foot.hml)
// REF: https://github.com/angular-ui/ui-router
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider

      .state('todo', {
        url: '/todo',
        templateUrl: 'views/todo/list.html'
    })

      .state('doing', {
        url: '/doing',
        templateUrl: 'views/doing/list.html'
    })

      .state('edit doing task', {
        url: '/doing/:doingTaskId',
        templateUrl: 'views/doing/edit.html'
    })

      .state('done', {
        url: '/done',
        templateUrl: 'views/done/list.html'
    })

      .state('categories', {
        url: '/categories',
        templateUrl: 'views/categories/manage.html'
    })

      

      // This is called when viewing an article.
      .state('article by id', {

        // This makes the value after "/articles/" in the url
        // available as "articleId" in the $stateParams.
        url: '/articles/:articleId',

        // GOTO: /public/views/articles/view.html
        templateUrl: 'views/articles/view.html'
    })

      // This is the default when no other routes were matched.
      .state('home', {
        url: '/',

        // GOTO: /public/views/index.html
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    // QUESTION: Why would you do this?
    $locationProvider.hashPrefix('!');
}
]);
