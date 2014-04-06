# On Directives

There are lots of [built in directives](http://docs.angularjs.org/api/ng/directive).

## How it Works

Directives identify parts of the DOM that should have special Angular goodness.  These parts are picked up by the compiler (see [$compile](http://docs.angularjs.org/api/ng/service/$compile)).

Directives are attached to modules using `directive` method of the [$compileProvider](http://docs.angularjs.org/api/ng/provider/$compileProvider#directive).

**What is a directiveFactory?**

The directive factory is executed the first time the compiler matches the directive.  The function returns an object that tells [$compile](http://docs.angularjs.org/api/ng/service/$compile) (see **Directive Definition Object**) how the directive works.

## Making Custom Directives


### A Simple Example
    
    angular.module('foo').directive('pointless', function () {
        return {
            template: 'some text to show in directive'
        };
    });

### Isolate Scope

The purpose is to isolate the scope within the directive from the scope outside the directive.  This is done with the `scope` option of the **directive definition object**.

The isolate scope *does not* inherit from the parent scope.

The scope option maps outer scope values to inner scope values in three different ways.

1. @ - map from directive's attributes as strings
    * `innerFoo: '@'` The inner scope's `innerFoo` value comes from the directive's `inner-foo` attribute.
    * `innerFoo: '@outerFoo'` The inner scope's `innerFoo` value comes from the directive's `outer-foo` attribute.
2. = 
3. &