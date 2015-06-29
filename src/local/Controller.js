import Class from './Class';
/**
 Constroller

 * Every controller has `state`
 * Controller emits 'statechange' event when state changes
 * `state` is determined by invoking callbacks
 * Controller can be in multple states

 Events:
 * statechange
 * wakeup
 * sleep
 * ...


Example:

 var authController = Controller.extend({
    construct: function() { throw new TypeError }, // cannot create instance
    states: {
        "authenticated": function() { return this.authenticated }.depends('authenticated')
        "authenticationFailed": function() { return !this.authenticated && this.authenticationFailed }
    },

 })

 authController.on('statechange', function(event, args) {
    if(this.state('authenticated')) {
        this.view.emit('sleep'); // hide authentication window
    } else {
        if(this.view.asleep) this.view.emit('wakeup');
        // view should automatically detect `auth..Failed` or `expired` state
    }
 }, 'default');

 */

var Controller = Class.extend({
	_states: [ ],
	_model: null,
	construct: function() { throw new TypeError; },
});
