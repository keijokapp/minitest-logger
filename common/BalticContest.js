import CallUtil from './CallUtil';


var BalticContest = Contest.extend({}, {
	period: { start: 0, end: 0 },
	sections: {
		'A': SectionPreset.SingleMixed,
		'B': SectionPreset.SingleCW,
		'C': SectionPreset.SingleSSB,
		'D': 'single operator, 2 hours, CW/SSB',
		'E': SectionPreset.MultiSingleMixed,
		'F': 'SWL'
	},
	frequencies: [ [3510, 3600], [ 3600, 3750 ] ],
	exchange: [ 'RST', 'NR' ],
	score: function(qso) {
		if(CallUtil.)
	}
	
})
