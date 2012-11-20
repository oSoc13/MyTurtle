/*
 * The Screen object will delegate from the DISS configuration array to other object
 */
window.Screen = (function() {

    // DISS configuration
    var config = {};
    
    /*
     * Initialize the UI with a DISS configuration array
     */
    function build(config) {
    	
        // setup interface
        Interface.setup(config.interface);
        
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
			
			// push location data to turtle
			turtle.options.screen_location = config.interface.latitude + ',' + config.interface.longitude;
            
            // append to pane
            var pane = Panes.get(turtle.pane);
            pane.el.append(placeholder);
            
            // sort the pane
            sort(pane.el.find('.turtle'));
            
            // grow the turtle
            Turtles.grow(turtle.type, id, turtle.options);
            
            // trigger event if needed
            if (pane.el.hasClass('active')) {
                Turtles.trigger(id, 'shown');
            }
        }
        
        // enable plugins
        for(var name in config.plugins) {
        	// try uppercase or lowercase
        	if (window[plugin] == null) {
        		var plugin = window[name.charAt(0).toUpperCase() + name.slice(1)];
        	} else {
        		var plugin = window[name];
        	}
        	
        	if (config.plugins[name] == 1 && plugin != null) {
        		plugin.enable();
        	} else {
        		plugin.disable();
        	}
        }
		
		// create jobs
        for(var id in config.jobs) {
            var job = config.jobs[id];
            Jobs.add(job);
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