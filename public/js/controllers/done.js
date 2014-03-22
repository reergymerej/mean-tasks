'use strict';

// $scope       This is created for each directive.
// $stateParams This comes from AngularUI Router.
// $location    http://docs.angularjs.org/guide/dev_guide.services.$location
// Global       /public/js/services/global.js
angular.module('done.tasks').controller('DoneCtrl', ['$scope', '$filter', '$stateParams', '$location', 'Global', 'DoingTasks',
    function ($scope, $filter, $stateParams, $location, Global, DoingTasks) {


    var setDefaultDates = function () {
        var start, end;

        start = new Date();
        start.setHours(0, 0, 0, 0);

        end = new Date(start.getTime());
        end.setDate(end.getDate() + 1);

        $scope.startDate = start;
        $scope.endDate = end;
    };

    $scope.startDate = undefined;
    $scope.endDate = undefined;
    $scope.categories = 'dev|other|admin|meeting'.split('|').sort();
    $scope.taskCategory = undefined;

    // Give this controller's scope access to the Global values.
    // $scope.global = Global;

    $scope.tasks = [];

    /**
    * Find tasks.
    */
    $scope.find = function () {

        var params = {},
            start = $scope.startDate,
            end = $scope.endDate;

        params = {
            start: start ? start.getTime() : undefined,
            end: end ? end.getTime() : undefined
        };

        var success = function (tasks) {
            $scope.tasks = tasks;
        };

        var failure = function () {
            console.error('unable to fetch tasks');
        };

        DoingTasks.query(params, success, failure);
    };

    $scope.init = function () {
        setDefaultDates();
        this.find();
    };

}]);