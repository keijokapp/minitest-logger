
export default document.readyState === 'complete' ? Promise.resolve() : new Promise(function(resolve, reject) {
	window.addEventListener('load', function() { resolve(); });
})
