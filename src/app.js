
// import logger from './logger';
import Connection from './Connection';

window.Connection = Connection;

/*
connection.request('test', { foo: 'bar' })
.catch(function() { console.error('failed') })
.then(function(data) {
	console.log('got response: ', data);
});
*/

/*

logger.controller('qsoListController', function() {
	console.log(this);
	this.inputs = [ {sntRS: 123}, {}, {} ];
});


logger.controller('qsoInputController', function($scope, loggerSocket) {
	console.log(this, $scope, $scope.sntRS);
	this.sntRS = '59';
	this.sntN = '1';
	this.rcvRS = '59';
	this.rcvN = '';
	
	var className = (new Date).getTime() % 3600000000;
	
	this.className = className;
	
	this.insert = function() {
		console.log(this, arguments)
	}
});
*/
