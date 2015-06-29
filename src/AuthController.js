import App from './App';
import Controller from './Controller';
import AuthView from './AuthView';


var AuthController = new Controller.extend({
	construct: function(/* model id not needed */) {
		this._super.construct();
		this._model = new AuthModel;
	},
    render: function(parent) {
        this._view.render(parent);
		
    }
});

AuthController.on('statechange', function() {
    if(this.state('authenticated')) {
        this.emit('sleep'); // hide authentication window
    } else {
        this.emit('wakeup');
        // view should automatically detect `auth..Failed` or `expired` state
    }
}, 'default');


export default AuthController;


/*
App.authController = new Controller({
    sleep: function() {
        if(this.state('asleep')) return;

        this.view.sleep();

        App.unsetEventListener('session-started', 'auhController');
        App.unsetEventListener('session-started', 'auhController');
    },

    wakeup: function() {
        if(!this.state('asleep')) return;

        var _this = this;
        var priv = this._protected;

        App.once('session-started', function(event, o) {
            _this.sleep();

            App.once('session-expired', function() {
                _this.wakeup();
            }, 'authController');

            localStorage.setItem('defaultUsername', o.username)
        }, 'authController');

        if(!priv.view) {
            priv.view = View.create({
                name: 'auth';
        });
    }

    priv.view.delegate('tryAuthenticate', App);

return priv.view.wakeup();
},
});*/
