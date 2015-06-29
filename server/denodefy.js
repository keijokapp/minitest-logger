
module.exports = function(func, thisval) {
	return function() {
		var args = arguments.slice(0);
		return new Promise(function(resolve, reject) {
			args.push(function(error, result) {
				if(err) {
					reject(error);
				} else {
					resolve(result);
				}
			})
			func.apply(thisval, args);
		});
	}
}
