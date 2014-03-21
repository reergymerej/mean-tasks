'use strict';

angular.module('doing.filters').
    filter('timesummary', ['$filter', function ($filter) {
        return function (task) {

            var result,
                start = task.start && new Date(task.start).getTime(),
                end = task.end && new Date(task.end).getTime();

            if (end) {
                result = Math.round((end - start) / 6000) + ' minutes';
            } else {
                result = $filter('date')(start, 'HHmm');
            }

            return result;
        };
    }]);