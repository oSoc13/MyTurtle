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
            throw new Error("Turtle already regsitered");
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

        // assign model
        instance.model = turtle.model || Backbone.Model.extend();

        // build and assign collection
        if (typeof turtle.collection == "function") {
            instance.collection = new turtle.collection(turtle.models, options);

            if (instance.collection.model == null)
                instance.collection.model = instance.model;

            // link options
            instance.collection.options = options;
        } else
            throw new Error("Turtle collection was not a constructor function");

        // build and assign view
        if (typeof turtle.view == "function") {
            instance.view = new turtle.view(_.extend(options, {
                collection : instance.collection,
                model : instance.model
            }));

            // link options
            instance.view.options = options;
        } else
            throw new Error("Turtle view was not a constructor function");

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
     * Grows turtles. Extend this function with your own breeder class.
     */
    function grow(type, id, options) {
        instantiate(type, id, options)
    }

    /*
     * Public interface to this object
     */
    var Turtles = {
        register : register,
        registered : registered,
        instantiate : instantiate,
        grow : grow,

        // allow access to turtle specifications and instances
        instances : instances,
        turtles : turtles
    };

    return Turtles;

}());