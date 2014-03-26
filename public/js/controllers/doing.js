'use strict';

// $scope       This is created for each directive.
// $stateParams This comes from AngularUI Router.
// $location    http://docs.angularjs.org/guide/dev_guide.services.$location
// Global       /public/js/services/global.js
angular.module('doing.tasks').controller('DoingCtrl', ['$scope', '$filter', '$stateParams', '$location', 'Global', 'DoingTasks', 'DoingCategories',
    function ($scope, $filter, $stateParams, $location, Global, DoingTasks, DoingCategories) {

    $scope.categories = [];
    $scope.taskCategory = undefined;

    // Give this controller's scope access to the Global values.
    // $scope.global = Global;

    $scope.fromDate = (function () {
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }());
    $scope.taskDescription = '';
    $scope.tasks = [];

    $scope.init = function () {
        loadCategories();
        this.find();
    };

    var loadCategories = function () {
        var success = function (categories) {

            categories.sort(function (a, b) {
                var result = 0;
                if (a.name < b.name) {
                    result = -1;
                } else if (b.name < a.name) {
                    result = 1;
                }
                return result;
            });

            angular.forEach(categories, function (category) {
                $scope.categories.push(category.name);
            });
        };

        var failure = function () {
            console.error('unable to fetch categories');
        };

        DoingCategories.query(success, failure);
    };

    /**
    * Filter the list of tasks.
    */
    $scope.filter = function () {
        var from = new Date($scope.fromDate);

        if (from.toString() === 'Invalid Date') {
            from = undefined;
        }

        $scope.find(from);
    };

    /**
    * Create a new task.
    * @param {DoingTask} [task]
    */
    $scope.create = function (doingTask) {

        var success = function (response) {
            if (response.errors) {
                console.error(response.errors);
            } else {
                $scope.tasks.unshift(response);
                $scope.taskDescription = '';
            }
        };

        var failure = function (response) {
            console.error('oh, shit', response);
        };

        doingTask = doingTask || new DoingTasks({
            description: $scope.taskDescription,
            category: $scope.taskCategory
        });

        doingTask.$save(success, failure);
    };

    /**
    * Delete a task.
    */
    $scope.remove = function (task) {

        if (task) {
            task.$remove();

            for (var i in $scope.tasks) {
                if ($scope.tasks[i] === task) {
                    $scope.tasks.splice(i, 1);
                    break;
                }
            }
        }
    };

    /**
    * Finish a task.
    * @param {TodoTask} task
    */
    $scope.finishTask = function (task) {
        var success = function () {};

        var failure = function (http) {
            console.error('unable to update task', http);
        };
        
        task.done = true;
        task.$update(success, failure);
    };

    /**
    * Find tasks.
    * @param {Date} from
    */
    $scope.find = function (from) {

        var params = {};

        from = $scope.fromDate;

        params = {
            from: from ? from.getTime() : undefined
        };

        var success = function (tasks) {
            $scope.tasks = tasks;
        };

        var failure = function () {
            console.error('unable to fetch tasks');
        };

        DoingTasks.query(params, success, failure);
    };

    /**
    * Resume a task.
    */
    $scope.resume = function (task) {
        var newTask = new DoingTasks({
            description: task.description,
            category: task.category
        });

        $scope.create(newTask);
    };

    /**
    * End or resume a task depending on if it is in progress.
    * @param {DoingTask} task
    */
    $scope.toggleTask = function (task) {
        if (task.end) {
            $scope.resume(task);
        } else {
            $scope.finishTask(task);
        }
    };
}]);