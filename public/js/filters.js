'use strict';

angular.module('doing.filters').
    filter('timesummary', ['$filter', function ($filter) {
        return function (task) {

            var result,
                start = task.start && new Date(task.start).getTime(),
                end = task.end && new Date(task.end).getTime(),
                minutes,
                hours = 0;

            var pad = function (x) {
                x = x + '';
                while (x.length < 2) {
                    x = '0' + x;
                }
                return x;
            };

            if (end) {
                minutes = Math.round((end - start) / 60000);
                if (minutes > 60) {
                    hours = Math.floor(minutes / 60);
                    minutes %= 60;
                }

                result = pad(hours) + ':' + pad(minutes);
            } else {
                result = $filter('date')(start, 'HHmm');
            }

            return result;
        };
    }])

    .filter('timespan', [function () {
        return function (ms) {

            var seconds = 0,
                minutes = 0,
                hours = 0;

            var pad = function (x) {
                x = x + '';
                while (x.length < 2) {
                    x = '0' + x;
                }
                return x;
            };

            seconds = Math.round(ms / 1000);

            if (seconds > 60) {
                minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;
            }

            if (minutes > 60) {
                hours = Math.floor(minutes / 60);
                minutes = minutes % 60;
            }

            return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        };
    }]);