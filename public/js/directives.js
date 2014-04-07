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
            innerFoo: '@outerFoo',

            innerFooWithInterpolation: '@outerFooWithInterpolation',

            // = gets values from outer scope

            // binds to outer scope value defined
            // in inner-bar attribute of directive
            innerBar: '=',

            // binds to outer scope value defined
            // in outer-bar attribute of directive
            innerBarTwo: '=outerBar',

            missingValueOne: '=',

            missingValueTwo: '=wtf',

            // inc-from-outer-scope
            incFromOuterScope: '&'
        }
    };
})

.directive('foo', function () {
    return {
        restrict: 'E',

        templateUrl: 'html/foo.html',

        scope: {
            foo: '=theFoo'
        }
    };
})

.directive('categorySelector', function () {
    return {
        restrict: 'E',
        templateUrl: 'html/category-selector.html'
    };
});