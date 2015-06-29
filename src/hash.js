
export default function(str) {
	var hash = 0;
	if(str.length == 0) return hash;
	for(var i = 0, l = str.length; i < l; i++) {
		char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
    return hash;
}
