import Class from './Class';


export default View = Class.extend({
    construct: function() { }
});

export var commonBindings = [
    function(model) {
       model.set(this.nodes[1].getAttribute('data-bind'), this.nodes[1].value);
    },
    function(model) {
        model.set(this.nodes[1].getAttribute('data-bind'), this.nodes[1].checked ? this.nodes[1].value : false);
    },
    ];