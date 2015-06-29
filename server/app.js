
import { Server as WSServer } from 'ws';

var wss = new WSServer({ port: 8001 });

wss.on('connection', function(conn) {
	console.log("New connection", conn.upgradeReq.url);
	conn.on("message", function(str) {
		str = JSON.parse(str);
		var event = str.event;
		var data = str.data;
		console.log("Received: (", event, ") ", data);
		conn.send(JSON.stringify({ event: event+'-response', data: data }));
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
});

console.log("WS server running (hopefully) on port %d", 8001);

