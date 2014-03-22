'use strict';

angular.module('mean', [
    'ngCookies',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'mean.system',
    'mean.articles',
    'todo.tasks',
    'doing.tasks',
    'doing.filters',
    'done.tasks'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('todo.tasks', []);
angular.module('doing.tasks', []);
angular.module('doing.filters', []);
angular.module('done.tasks', []);