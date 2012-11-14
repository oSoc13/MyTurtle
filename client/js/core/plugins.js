/*
 * Plugin management
 */
window.Plugins = (function() {

    // all loaded plugins
    var plugins = {};

    /*
     * Load a plugin
     */
    function load(plugin) {
    	// check if already loaded
    	if (plugins[plugins] == null) {
    		var source = 'client/js/plugins/' + plugin + '.js';
    		var self = this;
    		
    		// load the plugin object
    		$.ajax({
                url : source,
                dataType : 'script',
                async : false, // to prevent duplicate javascript file loading
                success : function() {
                	// save plugin
                	plugins[plugin] = true;
                }
            });
    	}
    }
    
    /*
     * Public interface to this object
     */
    return {
        load : load
    };

}());