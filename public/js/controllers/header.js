'use strict';

// The controller is added to the 'mean.system' module.
// The module is defined in /public/js/app.js.

// The controller is injected with $scope and Global.
// $scope comes from Angular.
// Global is a factory service defined in /public/js/services/global.js.
angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    // The nav links you see once you log in are pulled from here.
    $scope.menu = [
        {
            title: 'Todo',
            link: 'todo'
        },
        {
            title: 'Doing',
            link: 'doing'
        },
        {
            title: 'Done',
            link: 'done'
        }
    ];

    // This isn't used anywhere.
    $scope.isCollapsed = false;
}]);