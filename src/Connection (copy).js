import Config from './Config';
import timeoutPromise from './local/timeoutPromise';

var listeners = Object.create(null);
var openPromise = open();

function rejectAll() {
	var handlers = listeners;
	listeners = Object.create(null);
	
	for(var i in handlers) {
		for(var ii = 0; ii < handlers[i].length; ii++) {
			handlers[i][ii].reject();
		}
	}
}

function open() {
	var p = new Promise(function(resolve, reject) {
		console.log('trying to open');
		var socket = new WebSocket(Config.socketServer);
	
		socket.onopen = function() {
			resolve(socket);
		}

		socket.onclose = function() {
			console.log('failed');
			rejectAll();
			openPromise = timeoutPromise(Config.reconnectTimeout).then(open);
			reject();
		}
		socket.onerror = function() { this.close(); }

		socket.onmessage = function(message) {
			message = JSON.parse(message.data);

			var event = message.event;
			var data = message.data;
		
			if(!listeners[event]) {
				console.warn('ignored event %s', event);
				return;
			} else {
				var handlers = listeners[event];
				listeners[event] = [];
				for(var i = 0; i < handlers.length; i++) {
					handlers[i].resolve.call(undefined, data);
				}
			}
		}
	})
	return p;
}

var If = {
	once: function(event) {
		console.assert(typeof event === 'string');
		if(typeof listeners[event] !== 'object') listeners[event] = [ ];
		var p = new Promise(function(resolve, reject) {
			listeners[event].push({ resolve: resolve, reject: reject });
		});
		
		p.send = If.send;
		p.once = If.once;
	
		return p;
	},
	send: function(event, data) {
		var p = openPromise.then(function(socket) {
			socket.send(JSON.stringify({ event: event, data: data }));
		});
		
		p.send = If.send;
		p.once = If.once;
	
		return p;
	},
};

export default If;

