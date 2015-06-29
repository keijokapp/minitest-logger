
var esopen = Contest.extend({
	log: null, // {Log}
	checkCall: function(call) {
		var prev = this.log.searchCall(call);
		
//		if(prev[prev.length - 1].time )
		return 'DUPE';
	},
	score: function() {
		
	}
}, { });
