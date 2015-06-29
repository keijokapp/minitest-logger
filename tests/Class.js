import Class, { Private, Static, PrivateStatic } from '../src/Class';

var klass0 = Class.extend({
	u: Static(0),
	priv: PrivateStatic('private value'),
	getPriv: function() { return this.priv; }.makeStatic()
});

var klass1 = klass0.extend({
	u: Static(1),
	priv: PrivateStatic('another private value'),
	getPriv: function() { return this.priv; }.makeStatic()
});

var klass2 = klass1.extend({
	u: Static(2)
});

test('class instanceof tests', function() {
	notOk(klass0 instanceof Class);
 	notOk(klass1 instanceof Class);
 	notOk(klass2 instanceof Class);
    notOk(klass1 instanceof klass0);
    notOk(klass2 instanceof klass0);
    notOk(klass2 instanceof klass1);
});

test('properties: klass0', function() {
	ok(klass0.get('u') === 0);
	klass0.set('u', 20);
	ok(klass0.get('u') === 20);
    klass0.u = 100;
    ok(klass0.get('u') === 100);
});

test('static properties\' inheritance', function() {
	ok(klass1.get('u') === 1);
	klass0.set('u', 20);
    ok(klass1.get('u') !== 20);
    klass0.u = 100;
    ok(klass1.get('u') !== 100);
});

test('class method call & private member test', function() {
	throws(function() { klass0.get('priv'); }, ReferenceError);
	ok(klass0.getPriv() === 'private value' )
});

test('creation: Class', function() {
	var obj = Class.create();
	ok(obj instanceof Class);
	
	obj = new Class;
	ok(obj instanceof Class)
});

test('creation: subclass', function() {
	var klass0 = Class.extend({
		u: Static(33),
		priv: PrivateStatic('private value'),
		getPriv: function() { return this.priv; }.makeStatic()
	});

	var obj = new klass0;
	ok(obj);
	ok(obj instanceof klass0);
	ok(obj instanceof Class);

    obj = klass0.create();
    ok(obj);
    ok(obj instanceof klass0);
    ok(obj instanceof Class)
});

test('object method call & private member test', function() {
    var klass0 = Class.extend({
        priv: Private('private value'),
        getPriv: function() { return this.priv; }
    });

    var obj = new klass0;

    // no direct access
    throws(function() { return obj.get('priv'); }, ReferenceError);

    // not defined in public scope
    ok(obj.priv === undefined);

    ok(obj.getPriv() === 'private value' )
});

test('multilevel extending', function() {
    var klass0 = Class.extend({
        a: 3,
        priv: Private('private property'),
        getPriv: function() { return this.priv }
    });

    var klass1 = klass0.extend({
        a: 4,
        getPriv: function() { return this.priv; },
        getSuperPriv: function() { return this._super.getPriv(); },
        getSuperA: function() { return this._super.a }
    });

    // no static access
    throws(function() { klass0.get('a') }, ReferenceError);
    throws(function() { klass1.get('a') }, ReferenceError);


    var obj = new klass1;

    ok(obj.get('a') === 4);
    ok(obj.a === 4);
    ok(obj.getSuperA() === 3);

    // no direct access
    throws(function() { obj.get('priv') }, ReferenceError);

    // not in protected context
    ok(obj.getPriv() === undefined);

    ok(obj.getSuperPriv() === 'private property');
});

test('constructors', function() {
    var klass0 = Class.extend({
        a: 1,
        construct: function(arg) {
            this.__proto__.a += arg || 0;
        }
    });

    var klass1 = klass0.extend({
        construct: function() {
            if(arguments.length === 1) arguments[0] += 1;
            this._super.construct.apply(null, arguments);
        }
    });

    var obj = new klass1;
    ok(obj.a === 1);

    obj = new klass1(4);
    ok(obj.a === 6)
});
