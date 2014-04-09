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
            end: end ? end.getTime() : undefined,
            group: 'yeah'
        };

        var success = function (tasks) {
            $scope.tasks = tasks;
            makePie(tasks);
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

    // TODO: Make donuts instead of pies.
    // http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/pie-donut/
    var makePie = function (tasks) {
        var pad = function (x, length) {
            x = x + '';
            while (x.length < length) {
                x = '0' + x;
            }
            return x;
        };

        var formatter = function () {
            var name = this.point.name,
                y = this.point.y,
                s, m, h;

            s = Math.round(y / 1000);
            m = Math.floor(s / 60);
            if (m) {
                s = s % 60;
            }
            h = Math.floor(m / 60);
            if (h) {
                m = m % 60;
            }

            return h + ':' + pad(m, 2) + ':' + pad(s, 2);
        };


        $('#dummy-chart').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'How I Spent My Time'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        formatter: formatter
                    }
                }
            },
            series: [
                {
                    type: 'pie',
                    name: 'time spent',
                    data: (function () {
                        var data = [];

                        angular.forEach(tasks, function (task) {
                            data.push({
                                name: task.description,
                                y: task.duration
                            });
                        });

                        return data;
                    }())
                }
            ]
        });
    };
}]);