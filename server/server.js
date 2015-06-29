#!/usr/bin/node

var QSOs = [
	1235,
	{
		id: 'asd', // {UUID} / server-side generated id for QSO
		hash: 0, // {uint32} client-side generated for simple hash chain
		time: 0,
		freq: 0,
		mode: '',
		rcall: '',
		srst: '',
		rrst: '',
		rdata: null,
		sdata: null
	}
]


function onevent(event, data) {
	if(event === 'getQSOs') {
		this.emit('getQSOs-reponse', [
		])
	}
}


wss.on('connection', function(conn) {
	console.log("New connection");
	conn.on("message", function (str) {
		str = JSON.parse(str);
		var event = str.event;
		var data = str.data;
		console.log("Received: (", event, ") ", data);
		onevent.call(conn, event, data);
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
});
