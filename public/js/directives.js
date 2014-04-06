'use strict';

angular.module('doing.directives', [])

.directive('jgFoo', function () {
    return {
        template: 'I am the real foo.'
    };
});