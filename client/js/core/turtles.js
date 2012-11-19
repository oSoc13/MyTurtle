/*
 * The core of the the flatturtle framework. Grow and manage turtles from this
 * basic interface, more functionality is added by prototype.
 */
window.Turtles = (function() {

    // all known registered turtles
    var turtles = {};

    // all active turtles
    var instances = {};

    /*
     * Register a new turtle interface
     */
    function register(type, turtle) {
        if (turtles[type] != null)
            throw new Error("Turtle already registered");
        else if (typeof turtle != "object")
            throw new Error("Turtle has invalid type");
        else
            turtles[type] = turtle;

        return true;
    }

    /*
     * Check if a turtle is registered
     */
    function registered(type) {
        return turtles[type] != null;
    }
    
    /*
     * Trigger an event for a turtle by id or all turtles by type
     */
    function trigger(type, event) {
    	// trigger event turtle type
    	if (isNaN(type)) {
    		_(instances).each(function(instance, id) {
				if (instance.type == type) {
					if (typeof instance.collection == "object")
						instance.collection.trigger(event);
					if (typeof instance.view == "object")
						instance.view.trigger(event);
				}
			});
    	} 
    	// trigger event for turtle id
    	else {
    		var instance = instances[type];
    		if (instance == null)
                throw new Error("Unknown turtle instance");
    		
    		if (typeof instance.collection == "object")
				instance.collection.trigger(event);
			if (typeof instance.view == "object")
				instance.view.trigger(event);
    	}
    }

    /*
     * Create a new turtle instance
     */
    function instantiate(type, id, options) {
    	// check if turtle specification exists
        if (turtles[type] == null) {
            throw new Error("Unknown turtle");
            return;
        }

        if (options == null || typeof options != "object")
            options = {};
        
        // get turtle specification
        var turtle = turtles[type];

        // perpare instance object
        var instance = {};
        instance.type = type;
        instance.id = id;
        instance.el = options.el;
        
        // assign model
        instance.model = turtle.model || Backbone.Model.extend();

        // build and assign collection
        if (typeof turtle.collection == "function") {
            instance.collection = new turtle.collection(turtle.models, options);
            
            if (instance.collection.model == null)
                instance.collection.model = instance.model;

            // link options
            instance.collection.options = options;
        }

        // build and assign view
        if (typeof turtle.view == "function") {
            instance.view = new turtle.view(_.extend(options, {
            	collection : instance.collection,
                model : instance.model,
                el : options.el
            }));
            
            // link options
            instance.view.options = options;
        }

        // trigger born event
        if (typeof instance.collection == "object")
            instance.collection.trigger("born");
        if (typeof instance.view == "object")
            instance.view.trigger("born");

        // save instance
        instances[id] = instance;

        return instance;
    }

    /*
     * Grows turtles.
     */
    function grow(type, id, options) {
        var source = "turtles/" + type + "/dna.js";

        // options must be an object
        if (options == null || typeof options != "object") {
            options = {};
        }
        
        // fetch the turtle script only once
        if (!registered(type)) {
            $.ajax({
                url : source,
                dataType : "script",
                async : false, // to prevent duplicate javascript file loading
                success : function() {
                    instantiate(type, id, options);
                }
            });
        } else {
            instantiate(type, id, options);
        }
    }
    
    /*
     * Change a turtle's order
     */
    function order(id, order) {
    	if (instances[id] == null)
            throw new Error("Unknown turtle instance");
    	
    	var turtle = instances[id];
    	
    	// change order attribute
    	turtle.el.attr("data-order", parseInt(order));
    	
    	// sort turtles in this group
    	sort(turtle.el.parent().find(".turtle"));
    }
    
    /*
     * Change a turtle's options object
     */
    function options(id, options) {
        if (instances[id] == null)
            throw new Error("Unknown turtle instance");
        
        var turtle = instances[id];
        
        // update collection options
        if (turtle.collection.options != null)
            turtle.collection.options = _.extend(turtle.collection.options, options);
        
        // update view options
        if (turtle.view.options != null)
            turtle.view.options = _.extend(turtle.view.options, options);
        
        // trigger refresh event
        Turtles.trigger(id, "refresh");
    }

    /*
     * Public interface to this object
     */
    return {
        register : register,
        registered : registered,
        instantiate : instantiate,
        trigger : trigger,
        grow : grow,
        options : options,
        order : order
    };

}());