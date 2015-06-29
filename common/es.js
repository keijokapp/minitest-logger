import QSO from '../QSO.js';
import ESZone from './ESZone';

var RSTMixin = ExchangeMixin.extend({}, {
	hint: function(qso, log) {
		
		return {
			value: [Mode.FM, Mode.SSB].indexOf(log.mode) >= 0 ? '59' : '599',
			skip: true;
		}
	}
})

var ESZone = ExchangeItem.extend({}, {
	hint: function(contest) {
		
	}
});

var minitestQSO = QSO.extend({}, {
	exchange: [ 'nr' ],
});

var ukvQSO = QSO.extend({}, {
	exchange: [ 'WWL' ]
});

var ukvQSO = QSO.extend({}, {
	exchange: [ 'WWL' ]
});

var llvpQSO = QSO.extend({}, {
	exchange: [ 'nr', ESZone ]
});

var ullvpQSO = QSO.extend({}, {
	exchange: [ 'nr', 'WWL' ]
});

var esopenQSO = QSO.extend({}, {
	exchange: []
});
