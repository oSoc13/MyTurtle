/*
 * The Screen object will generete the correct UI from the DISS configuration array
 */
window.Screen = (function() {

    // DISS configuration
    var config = {};
    
    /*
     * Initialize the UI with a DISS configuration array
     */
    function build(config) {
    	
    	// create panes
        for(var id in config.panes) {
            var pane = config.panes[id];
            Panes.create(id, pane);
        }
        
        // create turtles
        for(var id in config.turtles) {
            var turtle = config.turtles[id];
            
            // create a placeholder
            var placeholder = $('<section class="turtle ' + turtle.type + '" data-id="' + id + '" data-order="' + turtle.order + '"></section>');
            turtle.options.el = placeholder;
            
            // append to pane
            var pane = Panes.get(turtle.pane);
            pane.el.append(placeholder);
            
            // grow the turtle
            Turtles.grow(turtle.type, id, turtle.options);
        }
    }
    
    /*
     * Fetch the configuration from the api source
     */
    function load(api) {
    	$.ajax({
            url : api,
            dataType: 'json',
            success : function(config) {
            	Screen.config = config;
            	Screen.build(config);
            }
        });
    }
    
    /*
     * Public interface to this object
     */
    return {
    	config : config,
    	build : build,
        load : load
    }

}());