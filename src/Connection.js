import Class from './local/Class';

var Connection = Class.extend({
	_listeners: Object.create(null),
	_openPromise: null, // only used in ._connection()
	_url: '',

	_connection: function() {
		var _this = this;
	
		if(_this._openPromise) {
			// check the validity of socket
			return _this._openPromise.then(function(socket) {
				if(socket.readyState === 1) { // "OPEN"
					return socket;
				}
				throw undefined;
			}).catch(function() {
				_this._openPromise = null;
				return _this._connection();				
			});
		}
		
		return _this._openPromise = new Promise(function(resolve, reject) {
			var socket = new WebSocket(_this._url);

			socket.onopen = function() {
				resolve(socket);
			}

			socket.onclose = function() {
				// reject all listeners
				var handlers = _this._listeners;
				_this._listeners = Object.create(null);
				for(var i in handlers) {
					for(var ii = 0, l = handlers[i].length; ii < l; ii++) {
						handlers[i][ii].reject.call(null);
					}
				}
				reject();
			}

			socket.onerror = function() { this.close(); }
		}).then(function(socket) {
			socket.onmessage = function(message) {
				message = JSON.parse(message.data);

				var event = message.event;
				var data = message.data;

				var handlers = _this._listeners[event];
				_this._listeners[event] = [];
		
				if(!handlers) {
					console.warn('ignored event %s', event);
				} else {
					for(var i = 0, l = handlers.length; i < l; i++) {
						handlers[i].resolve.call(null, data);
					}
				}
			}
			return socket;			
		});
	},
	
	_addChainMethods: function(p) {
		var _this = this;
		p.emit = function(event, data) {
			return _this._addChainMethods(p.then(_this.emit.bind(_this, event, data)));
		}
		p.once = function(event) {
			return _this._addChainMethods(p.then(_this.once.bind(_this, event)));
		}
		return p;
	},
	
	construct: function(url) {
		this._url = url;
	},

	emit: function(event, data) {
		var _this = this;
		
		return _this._addChainMethods(_this._connection().then(function(socket) {
			socket.send(JSON.stringify({ event: event, data: data }));
		}));
	},
	
	once: function(event) {
		var _this = this;
	
		if(typeof _this._listeners[event] !== 'object') _this._listeners[event] = [ ];

		return new Promise(function(resolve, reject) {
			_this._listeners[event].push({ resolve: resolve, reject: reject });
		});
	}
});

export default Connection;

