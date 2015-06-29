
/* ClassMembers */
var Static = function(value) {
    if(!(this instanceof Static)) return new Static(value);
    this.value = value;
};

var Member = function(value) {
    if(!(this instanceof Member)) return new Member(value);
    this.value = value
};

Static.prototype.makePrivate = Member.prototype.makePrivate  = function() { this._isPrivate = true; return this; };
function Private(value) { return (new Member(value)).makePrivate(); }
function PrivateStatic(value) { return (new Static(value)).makePrivate(); }

/* method flag setters */

Object.defineProperty(Function.prototype, 'makeStatic', {
	enumerable: false,
	value: function() {	this._isStatic = true; return this;	}
});

Object.defineProperty(Function.prototype, 'makePrivate', {
	enumerable: false,
	value: function() { this._isPrivate = true; return this; }
});



/* Class implementation */

var get = function(parent, key) {
	if(this.hasOwnProperty(key)) return this[key];
	else if(parent) return parent.get(key);
	else throw new ReferenceError;
};

var set = function(parent, key, value) {
	if(this.hasOwnProperty(key)) this[key] = value;
	else if(parent) parent.set(key, value);
	else throw new ReferenceError;
	return this;
};

/*
 *
 * @param {Class} bindObject object to be created
 * @param {Object} callerContext caller's context
 */

var setup = function(bindObject, callerContext) {
    var thisContext = arguments.length === 2 ? { "__proto__": bindObject } : callerContext = bindObject;

	if(typeof this.__proto__.__proto__.setup === 'function') {
        thisContext._super = this.__proto__.__proto__.setup(bindObject, thisContext);
    }

	var privateScope = {
        "_super": thisContext._super,
        "__proto__": bindObject
    };

    var members = this.properties;

	for(var i in members) {
        if(members[i] instanceof Function) {
            var method = members[i].bind(privateScope);
            if (members[i]._isPrivate) {
                privateScope[i] = method;
            } else {
                thisContext[i] = callerContext[i] = method;
            }
        } else if(members[i] instanceof Member) {
			if(members[i]._isPrivate)
				privateScope[i] = members[i].value;
			else {
                thisContext[i] = members[i].value;
                callerContext[i] = members[i].value;
            }
		} else {
            thisContext[i] = members[i];
            callerContext[i] = members[i];
		}
	}

    return thisContext;
};

var extend = function(members) {
	var thisClass = this;
	
	/* `public` `static` scope */
	var newClass = function() {
		console.assert(this instanceof newClass); // not completely safe but...

		var thisClass = newClass; // just for clarity

        this.get = get.bind(this, null);
        this.set = set.bind(this, null);
        this.construct = function() { };

		thisClass.setup(this);

        if(typeof this.construct === 'function') this.construct.apply(null, arguments);
	};

	newClass.prototype.__proto__ = thisClass.prototype;
	newClass.__proto__ = thisClass;
	newClass.get = get.bind(newClass, thisClass);
	newClass.set = set.bind(newClass, thisClass);
	newClass.extend = extend.bind(newClass);


	/* `private` `static` scope */
	var privateScope = {
        properties: { "__proto__": null },
        "__proto__": newClass
    };


    newClass.setup = setup.bind(privateScope);


    for(var i in members) {
        if(!members.hasOwnProperty(i)) continue;
        if(members[i] instanceof Static || (members[i] instanceof Function && members[i]._isStatic)) {
            var bindObj = members[i]._isPrivate ? privateScope : newClass;
            bindObj[i] = members[i] instanceof Function ? members[i].bind(privateScope) : members[i].value;
        } else {
            privateScope.properties[i] = members[i];
        }
    }

	return newClass;
};

var Class = function() {
	var obj = this;
	obj.get = get.bind(obj);
	obj.set = set.bind(obj);
	return obj
};

Class.get = function() { throw new ReferenceError };

Class.set = function() { throw new ReferenceError };

Class.extend = extend;

Class.create = function() { return new this };

export default Class;
export { Static, PrivateStatic, Private };
