'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),

    // Consolidate is used as an interface for different
    // templating engines.
    // REF: https://github.com/visionmedia/consolidate.js/
    consolidate = require('consolidate'),

    // connect-mongo is used to make establishing connections
    // to MongoDB easier.
    // REF: https://github.com/kcbanner/connect-mongo#example
    mongoStore = require('connect-mongo')(express),

    // REF: https://github.com/jaredhanson/connect-flash
    flash = require('connect-flash'),

    // REF: https://github.com/madhums/node-view-helpers
    helpers = require('view-helpers'),

    // This loads the combo config from 'all.js' and the
    // the file that matches whatever environment is specified
    // in /server.js (process.env.NODE_ENV).
    config = require('./config');

module.exports = function(app, passport, db) {
    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;
		// cache=memory or swig dies in NODE_ENV=production
		app.locals.cache = 'memory';
		
    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(express.logger('dev'));
    }

    // assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    app.set('view engine', 'html');

    // Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');

    // Enable jsonp
    app.enable('jsonp callback');

    app.configure(function() {
        // The cookieParser should be above session
        app.use(express.cookieParser());

        // Request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        // Express/Mongo session storage
        app.use(express.session({
            secret: config.sessionSecret,
            store: new mongoStore({
                db: db.connection.db,
                collection: config.sessionCollection
            })
        }));

        // Dynamic helpers
        // This just loads the app name into each response.
        app.use(helpers(config.app.name));

        // Use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        // Connect flash for flash messages
        app.use(flash());

        // Routes should be at the last
        app.use(app.router);

        // Setting the fav icon and static folder
        app.use(express.favicon());
        app.use(express.static(config.root + '/public'));

        // Assume "not found" in the error msgs is a 404. this is somewhat
        // silly, but valid, you can do whatever you like, set properties,
        // use instanceof etc.
        app.use(function(err, req, res, next) {
            // Treat as 404
            // This is a clever way of testing for a substring.
            if (~err.message.indexOf('not found')) return next();

            // Log it
            console.error(err.stack);

            // Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        // Assume 404 since no middleware responded
        app.use(function(req, res) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    });
};
