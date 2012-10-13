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
    function register(name, turtle) {
        if (turtles[name] != null)
            throw new Error("Turtle already regsitered");
        else if (typeof turtle != "object")
            throw new Error("Turtle has invalid type");
        else
            turtles[name] = turtle;

        return true;
    }

    /*
     * Create a new turtle instance
     */
    function instantiate(name, id, options) {
        // check if turtle specification exists
        if (turtles[name] == null) {
            throw new Error("Unknown turtle");
            return;
        }

        if (options == null || typeof options != "object")
            options = {};

        // get turtle specification
        var turtle = turtles[name];

        // perpare instance object
        var instance = {};
        instance.name = name;
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
     * Public interface to this object
     */
    var Turtles = {
        register : register,
        instantiate : instantiate,

        // allow access to turtle specifications and instances
        instances : instances,
        turtles : turtles
    };

    return Turtles;

}());