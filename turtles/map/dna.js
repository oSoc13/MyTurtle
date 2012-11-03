(function($){
	
	var view = Backbone.View.extend({
		// hold google maps objects
		center : null,
		map : null,

		initialize : function() {
			// default zoom
			if (!this.options.zoom)
				this.options.zoom = 13;
			
			// get the google maps api
			$.getScript("http://maps.googleapis.com/maps/api/js?sensor=false&callback=mapsLoaded");
			
			// render will be triggered when the google maps api is loaded
			this.bind("render", this.render);
		},
		render : function() {
			var self = this;
			
			$.get('turtles/map/views/list.html', function(template) {
				var data = {
					location : self.options.location
				};
				
				// render html
				self.$el.html(Mustache.render(template, data));
				
				// canvas element
				var canvas = self.$el.find("#canvas")[0];
				
				// map options
				var options = {
				    zoom : self.options.zoom,
				    disableDefaultUI: true,
				    mapTypeId : google.maps.MapTypeId.ROADMAP
				};
				
				// create the google map object
				self.map = new google.maps.Map(canvas, options);
				
				// convert location to geocode
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					"address" : self.options.location
					}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							self.center = results[0].geometry.location;
							self.map.setCenter(self.center);
							
							var marker = new google.maps.Marker({
					            map: self.map,
					            position: results[0].geometry.location
					        });
						}
				});
				
				// add traffic layer
				var trafficLayer = new google.maps.TrafficLayer();
				trafficLayer.setMap(self.map);
			});
		}
	});
	
	// register turtle
	Turtles.register("map", {
		view : view
	});
	
})(jQuery);

// callback when the google maps api is ready
if (typeof mapsLoaded != 'function') {
	function mapsLoaded() {
		// trigger for all map turtles
		Turtles.trigger("map", "render");
	}
}