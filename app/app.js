/**
 * The Application.
 *
 * @class App
 * @version 0.0.1
 * @static
 */
window.App = Ember.Application.create({});

/*
 * Get all Controller objects.
 */
require('app/controllers/controller');

/*
 * Get all Router/Route objects.
 */
require('app/routes/router');

/*
 Get all View objects.
 */
require('app/views/view');
