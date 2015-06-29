/* no imports */
/*
var setup = function(members, bindContext, callerContext) {
	var thisContext = bindContext === callerContext ? callerContext : { "__proto__": this.prototype };
	

	for(var i in members) {
		thisContext[i] = callerContext[i] = members[i];
	}

	thisContext.__super = this.__proto__.__setup(bindContext, thisContext);
	
	return thisContext;
};
*/
var Class = function() { }

Class.extend = function(members, staticMembers) {
	var newClass = function() {
//		newClass.setup(this, this, this);

        if(typeof this.construct === 'function') this.construct.apply(this, arguments);

		return this;
	};
	
	for(var i in members) {
        if(!members.hasOwnProperty(i)) continue;
		newClass.prototype[i] = members[i];
    }
		
	for(var i in staticMembers) {
        if(!staticMembers.hasOwnProperty(i)) continue;
		newClass[i] = staticMembers[i];
    }

	newClass.prototype.__proto__ = this.prototype; // makes instanceof & method inheritance work
	newClass.__proto__ = this; // makes static member inheritance work
//    newClass.__setup = setup.bind(newClass, __members);
	
	return newClass;
};

export default Class;
