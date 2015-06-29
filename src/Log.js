//import Model from './local/Model';
import Connection from './Connection';
import Config from './Config';
import hash from './hash';
import Model from './Model';
import QSO from './QSO';


var Log = Class.extend({
	_lastQSOId: '',
	_lastHash: false,
	_actionPromise: Promise.resolve();
	
	construct: function(logname) {
		this._connection = new Connection(Config.socketServer);
	},
	
	/**
	 * @returns {Promise}
	 */
	getQSOs: function() {
		var _this = this;
		if(_this._lastHash) _this._lastHash = null; // in progress...
		return this._actionPromise = this._actionPromise
			.then(function() {
				return this._connection
					.emit('getQSOs', { deleted: false, lastRevision: true })
					.once('getQSOs-response')
					.then(function(QSOs) {
						console.assert(typeof QSOs === 'array', QSOs);
					
						var lastQSO = QSOs[QSOs.length - 1];

						_this._lastHash = lastQSO.hash
						console.log('got QSOs: ', QSOs);
					});
			})
	},

	/**
	 * @returns {Promise}
	 */
	insertQSO: function(qsoData) {
		var _this = this;
		if(_this._lastHash === false) _this.getQSOs(); 

		return _this._actionPromise = _this._actionPromise
			.then(function() {
				qsoData.hash = (_this._lastHash + hash(JSON.stringify(qsoData)) & 0xffffffff;
				console.log('hash: ' + qsoData)
				this._connection
					.emit('insertQSO', qsoData)
					.once('insertQSO-response')
					.then(function(uuid) {
						if(typeof uuid === 'string') {
							qsoData.id = uuid;
							_this._lastHash = qsoData.lastHash;
							console.log('inserted QSO: ', qsoData);
						} else {
							console.error('error: ', uuid);
						}
					});
			});
	},
});

