'use strict';

angular.module('directives', [])

.directive('superSimple', function () {
    return {
        template: 'I am the real foo.'
    };
})

.directive('simpleTemplateUrl', function () {
    return {
        templateUrl: 'html/simpleTemplateUrl.html'
    };
})

.directive('simpleTemplateUrlElement', function () {
    return {
        restrict: 'E',
        templateUrl: 'html/simpleTemplateUrl.html'
    };
})

.directive('templateUrlWithScope', function () {
    return {
        restrict: 'E',
        templateUrl: 'html/templateUrlWithScope.html'
    };
})

.directive('isolateScope', function () {
    return {
        // only works for elements
        restrict: 'E',

        // url of html to use for template
        templateUrl: 'html/isolate-scope.html',

        // define where the inner scope's values
        // come from
        scope: {

            // @ gets values from the directive attributes
            // as strings.

            // the directive's innerFoo value
            // innerFoo: '@',

            // the directive's outerFoo attribute
            innerFoo: '@outerFoo'
        }
    };
});