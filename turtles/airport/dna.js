(function($) {

	var collection = Backbone.Collection.extend({
		initialize : function(models, options) {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "refresh");

			// bind refresh
			this.bind("born", this.refresh);
			this.bind("refresh", this.refresh);

			// default error value
			options.error = false;
			
			// default limit
            if (!options.limit)
                options.limit = 5;

			// automatic collection refresh each minute, this will 
			// trigger the reset event
			refreshInterval = window.setInterval(this.refresh, 60000);
		},
		refresh : function() {
			var self = this;
			
			// get the airport name
			$.ajax({
				url: "http://data.irail.be/spectql/Airports/Stations%7Bname,code%7D?code=='" + self.options.location + "':json",
				dataType: 'json',
				success: function(data) {
				    if (data.spectql.length > 0) {
				    	// detect airport name change
				    	if (self.options.airport != data.spectql[0].name) {
    						self.options.airport = data.spectql[0].name;
    						self.trigger("reset");
							
							// get walk and bike times with airport name
							// @TODO: use opentripplanner
				    	}
				    }
				}
			});
			
			// refresh entries
			self.fetch({
				error : function() {
					// will allow the view to detect errors
					self.options.error = true;
					
					// if there are no previous items to show, display error message
					if(self.length == 0) {
						self.trigger("reset");
					}
				}
			});
		},
		url : function() {
			var today = new Date();
			var month = today.getMonth() + 1;
			var day = today.getDate();
			var year = today.getFullYear();
			var minutes = today.getMinutes();
		    var hours = (today.getHours() + 2)%24;

			if (minutes < 10)
				minutes = "0" + minutes;

			if (hours < 10)
				hours = "0" + hours;

			if (month < 10)
				month = "0" + month;

			if (day < 10)
				day = "0" + day;

			var query = this.options.location + "/" + year + "/" + month + "/" + day + "/" + hours + "/" + minutes;

			// remote source url
		    // todo: add departures or arrivals
			return "http://data.irail.be/spectql/Airports/Liveboard/" + query + "/departures.limit(" + parseInt(this.options.limit) + "):json";
		},
		parse : function(json) {
			// parse ajax results
			var liveboard = json.spectql;

			for (var i in liveboard) {
				var time = new Date(liveboard[i].time * 1000);
				liveboard[i].time = this.formatTime(time);
				
				if (liveboard[i].delay) {
					var delay = new Date(liveboard[i].delay * 1000 + time.getTimezoneOffset() * 60000);
					liveboard[i].delay = this.formatTime(delay);
				}
			}
			
			return liveboard;
		},
		formatTime : function(time) {
			var hours = time.getHours();
			var minutes = time.getMinutes();
			return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
		}
	});

	var view = Backbone.View.extend({
		initialize : function() {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "render");

			// bind render to collection reset
			this.collection.bind("reset", this.render);

			var self = this;
			
			// pre-fetch template file and render when ready
			if (this.template == null) {
				$.get("turtles/airport/views/list.html", function(template) {
					self.template = template;
					self.render();
				});
			}
		},
		render : function() {
			// only render when template file is loaded
			if (this.template) {
				var data = {
					airport : this.options.airport || this.options.location,
					walking : this.options.walking,
					walking : this.options.bicycling,
					entries : this.collection.toJSON(),
					error : this.options.error // have there been any errors?
			    };
			    
			    // add html to container
				this.$el.html(Mustache.render(this.template, data));
			}
		}
	});

	// register turtle
	Turtles.register("airport", {
		collection : collection,
		view : view
	});

})(jQuery);