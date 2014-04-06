I've spent a lot of time recently mucking around across the whole MEAN stack.  MEAN.io includes a lot of added tools, which is cool, but it can be distracting.  So, I'm going to refocus now that I'm comfortable with the entire stack.  No, I'm not an expert yet, just comfortable.  Documenting almost every line of the code really helped to understand what was going on as did working on my own goofy project.  I made a time/task tracking system to use at work.  That was a good way to let the MEAN stuff sink in, but eventually the learning slowed and I started to focus on the business logic of what I was doing.  That's fun, but I now it's time to get back to deliberate study.

So, back to Angular.  The first thing we'll focus on is directives.

# Directives

There are lots of [built in directives](http://docs.angularjs.org/api/ng/directive).  Read over this cheat sheet and learn how they work.

## How Directives Work

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
    * Any interpolated values (defined in the directive's attribute to pull from the outer scope) will still populate from the outer scope.
2. = - map from parent scope property to isolate scope property
    * `innerBar: '='` - The inner scope's `innerBar` value is bound to the outer scope value indicated in the directive's `inner-bar` attribute.
    * `innerBar: '=outerBar'` - The inner scope's `innerBar` value is bound to the outer scope value indicated in the directive's `outer-bar` attribute.
    * Values bound like this will update each other.  Changes in the isolate scope will be reflected in the outer scope and vice versa.
3. & - map an expression to be executed in the outer scope
    * This follows the same pattern as above, though I can't think up an example.

----
#### References
* [developer guide](http://docs.angularjs.org/guide/directive)
* [explanation of Directive Definition Object](http://docs.angularjs.org/api/ng/service/$compile)
* [built in directives](http://docs.angularjs.org/api/ng/directive)