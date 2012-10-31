/*
 * The Screen object will generete the correct UI from the DISS configuration array
 */
window.Screen = (function() {

    // DISS configuration
    var config = {};
    
    /*
     * Initialize the UI with a DISS configuration array
     */
    function initialize(config) {
        this.config = config;
        
        // create panes
        for(var id in config.panes) {
            var pane = config.panes[id];
            Panes.create(pane.type, id);
        }
        
        // create turtles
        for(var id in config.turtles) {
            var turtle = config.turtles[id];
            
            // create a placeholder
            var placeholder = $('<section class="turtle" id="' + id + '"></section>');
            turtle.options.el = placeholder;
            
            // assign the placeholder to the correct pane
            var pane = Panes.get(turtle.pane);
            pane.append(placeholder);
            
            // grow the turtle
            Turtles.grow(turtle.type, id, turtle.options);
        }
    }
    
    /*
     * Public interface to this object
     */
    return {
        initialize : initialize
    }

}());