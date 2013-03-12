(function($) {

	var collection = Backbone.Collection.extend({
		initialize : function(models, options) {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "refresh");
			_.bindAll(this, "url");

			// bind refresh
			this.on("born", this.refresh);
			this.on("refresh", this.refresh);
			this.on("reconfigure", this.refresh);

			// default error value
			options.error = false;

			// automatic collection refresh each 5 minutes, this will
			// trigger the reset event
			refreshInterval = window.setInterval(this.refresh, 300000);
		},
		refresh : function() {
			var self = this;
			// pick screen location when location is not set
			if(typeof self.options == "undefined" || self.options.location == null || self.options.location == ""){
				self.options.location = Screen.location.geocode;
				Screen.listeners[self.options.id] = true;
			}else{
				delete Screen.listeners[self.options.id];
			}

			self.fetch({
				error : function() {
					// will allow the view to detect errors
					self.options.error = true;

					// if there are no previous items to show, display error message
					if(self.length == 0)
						self.trigger("reset");
				}
			});
		},
		url : function() {
			var self = this;
			var latitude = self.options.location.split(',')[0];
			var longitude = self.options.location.split(',')[1];
			return "https://data.flatturtle.com/Weather/Rainfall/" + encodeURIComponent(latitude) + "/" + encodeURIComponent(longitude) + ".json";
		},
		parse : function(json) {
			var data = json.Rainfall;

			// new array
			var results = new Array();

			var raining;

			// now date object
			var now = data[0].time;
			var date = new Date();

			// intervals in minutes to keep
			var keep = [0, 30, 60, 120];

			for (var i in data) {

				// minutes from now
				var delta = (data[i].time - data[0].time) / 60;

				// text
				if (delta == 0)
					data[i].text = "now";
				else if (delta > 60)
					data[i].text = "in " + Math.floor(delta/60) + " hours";
				else if (delta == 60)
					data[i].text = "in 1 hour";
				else
					data[i].text = "in " + delta + " min";

				// raining?
				data[i].raining = parseInt(data[i].milimeter) != 0;

				// first item
				if (i == 0) {
					raining = data[i].raining;
				}

				// delta is a keep value
				if (keep.indexOf(delta) > -1) {
					results.push(data[i]);
					continue;
				}

				// sunshine
				if (raining && !data[i].raining) {
					raining = false;
					results.push(data[i]);
					continue;
				}

				// raining
				if (!raining && data[i].raining) {
					raining = false;
					results.push(data[i]);
					continue;
				}

			}

			return results.slice(0,4);
		}
	});

	var view = Backbone.View.extend({
		initialize : function() {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "render");

			// bind render to collection reset
			this.collection.on("reset", this.render);

			// pre-fetch template file and render when ready
			var self = this;
			if (this.template == null) {
				$.get("turtles/weather/views/list.html", function(template) {
					self.template = template;
					self.render();
				});
			}
		},
		render : function() {
			// only render when template file is loaded
			if (this.template && this.collection.length) {

				var data = {
					entries : this.collection.toJSON(),
					error : this.options.error // have there been any errors?
				};

				// add html to container
				this.$el.empty();
				this.$el.html(Mustache.render(this.template, data));

				// change turtle padding
				this.$el.css('padding-bottom','0px');
			}
		}
	});

	// register turtle
	Turtles.register("weather", {
		collection : collection,
		view : view
	});

})(jQuery);