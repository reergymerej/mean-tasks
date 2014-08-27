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

    // http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-donut/
    var makePieDonut = function (tasks) {

        var pad = function (x, length) {
            x = x + '';
            while (x.length < length) {
                x = '0' + x;
            }
            return x;
        };

        var getTimeFromMs = function (ms) {
            var s, m, h,
                time = '';

            s = Math.round(ms / 1000);
            m = Math.floor(s / 60);
            if (m) {
                s = s % 60;
            }
            h = Math.floor(m / 60);
            if (h) {
                m = m % 60;
            }

            s = pad(s, 2);
            time = s;
            
            m = pad(m, 2);
            time = m + ':' + s;

            if (h) {
                time = h + ':' + time;
            }

            return time;
        };

        var formatter = function () {
            var name = this.point.name,
                timeString = getTimeFromMs(this.point.y);

            return name + ' ' + timeString;
        };

        var colors = Highcharts.getOptions().colors; 
    
        var taskData = [],
            categories = [],
            taskIndex = 0;

        angular.forEach(tasks, function (task) {
            var lastCategory = categories.slice(-1)[0],
                thisCategory = {},
                color = colors[categories.length - 1];

            // Is this a new category?
            if (!lastCategory || lastCategory.name !== task.category) {
                color = colors[categories.length];
                categories.push({
                    name: task.category,
                    y: 0,
                    color: color
                });
                taskIndex = 0;
            } else {
                taskIndex++;
            }

            taskData.push({
                name: task.description,
                y: task.duration,
                color: color
                // color: Highcharts.Color(color).brighten( 
                //     (( taskIndex % 3 ) + 1) / 7
                // ).get()
            });

            thisCategory = categories.slice(-1)[0];
            thisCategory.y += task.duration;
        });
    
        // Create the chart
        $('#chart-container').highcharts({
            chart: {
                type: 'pie'
            },
            title: {
                text: 'How I Spent My Time'
            },
            yAxis: {
                title: {
                    text: 'time'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            series: [
                {
                    name: 'Category',
                    data: categories,
                    size: '60%',
                    dataLabels: {
                        enabled: false
                    }
                },
                {
                    name: 'Task',
                    data: taskData,
                    size: '80%',
                    innerSize: '60%',
                    dataLabels: {
                        formatter: formatter
                    }
                }
            ]
        });
    };
    
    $scope.showList = false;
    $scope.startDate = undefined;
    $scope.endDate = undefined;
    $scope.categories = 'dev|other|admin|meeting'.split('|').sort();
    $scope.taskCategory = undefined;
    $scope.substring = undefined;
    $scope.checked = {};

    // Give this controller's scope access to the Global values.
    // $scope.global = Global;

    $scope.tasks = [];

    /**
    * Find tasks.
    */
    $scope.find = function () {

        var params = {},
            start = this.startDate,
            end = this.endDate;

        params = {
            start: start ? start.getTime() : undefined,
            end: end ? end.getTime() : undefined,
            group: 'yeah'
        };

        var success = function (tasks) {
            $scope.tasks = tasks;
            makePieDonut(tasks);
        };

        var failure = function () {
            console.error('unable to fetch tasks');
        };

        DoingTasks.query(params, success, failure);
    };

    $scope.findWithSubstring = function () {
        var params = {
            substring: this.searchString
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

    $scope.doBulkAction = function () {
        var ids = [];
        // remove non-true from checked
        angular.forEach($scope.checked, function (val, key) {
            if (!val) {
                delete $scope.checked[key];
            } else {
                ids.push(key);
            }
        });

        // POST these ids with a flag
        console.log(this.newDescription);

        console.log($scope.checked);
        console.log(ids);
    };

    $scope.days = {};

    // Load a summary of everything.
    $scope.loadHistory = function () {

        var params = {
            // This flag will signal to the backend-controller how we want everything grouped.
            history: true
        };

        var success = function (tasks) {
            var days = {};

            angular.forEach(tasks, function (task) {
                
                // group by days
                var dayMS = (new Date(task.start)).setHours(0, 0, 0, 0);
                days[dayMS] = days[dayMS] || {};

                // group by task category
                days[dayMS][task.category] = days[dayMS][task.category] || 0;
                task.duration = parseInt(task.duration, 10);
                if (!isNaN(task.duration)) {
                    days[dayMS][task.category] += task.duration;
                }
            });

            $scope.days = days;
        };

        var failure = function () {
            console.error('unable to fetch tasks');
        };

        DoingTasks.query(params, success, failure);
    };
}]);