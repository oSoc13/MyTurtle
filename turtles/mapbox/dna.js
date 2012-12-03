/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

(function($){

    var view = Backbone.View.extend({
		// mapbox object
		map : null,

		initialize : function() {
		    var self = this;
		    
			// default zoom
			if (!this.options.zoom)
				this.options.zoom = 13;

            // get the mapbox api if needed
            if (typeof(mapbox) == 'undefined') {
                // for some reason mapbox breaks mustache, so take a backup
                var Mustache = window.Mustache;
                
    			$.getScript("http://api.tiles.mapbox.com/mapbox.js/v0.6.6/mapbox.js", function() {
    			    // restore backup
    			    window.Mustache = Mustache;
    			    
    			    // render map
    	            self.render();
    			});
            } else {
                self.render();
            }
		},
		render : function() {
			var self = this;

			$.get("turtles/mapbox/views/widget.html", function(template) {
				var data = {
					location : Screen.location.address
				};

				// set window height to load
				self.$el.height("100%");
				
				// render html
				self.$el.empty();
				self.$el.html(window.Mustache.render(template, data));

				// change turtle padding
				self.$el.addClass("nopadding");

				// canvas element
				var canvas = self.$el.find("#canvas")[0];

				// create the mapbox object
				self.map = mapbox.map(canvas);
				self.map.addLayer(mapbox.layer().id('examples.map-vyofok3q'));
				
				// center and zoom
				self.map.center({ lat: Screen.location.latitude, lon: Screen.location.longitude });
				self.map.zoom(parseInt(self.options.zoom));
			});
		}
    });

	// register turtle
	Turtles.register("mapbox", {
		view : view
	});

})(jQuery);