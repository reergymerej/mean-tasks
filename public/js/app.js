'use strict';

// The main module is defined here
// along with its dependencies (including other modules).
angular.module('mean', [
    'ngCookies',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'mean.system',
    'mean.articles',
    'todo.tasks',
    'doing.tasks'
]);

// These are dependent modules.
// If you're defining new modules, don't forget to define them
// as well as include them as dependencies for the main 'mean' module.
angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('todo.tasks', []);
angular.module('doing.tasks', []);
