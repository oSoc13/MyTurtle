(function($) {
	
	var collection = Backbone.Collection.extend({
		initialize : function(models, options) {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "refresh");
			_.bindAll(this, "parseStationName");

			// bind refresh
			this.bind("born", this.refresh);
			this.bind("refresh", this.refresh);
			
			// default error value
			options.error = false;
			
			// default distance values
			options.walking = "00:00";
			options.bicycling = "00:00";

			// default limit
			if (!options.limit)
				options.limit = 5;
			
			// automatic collection refresh each minute, this will 
			// trigger the reset event
			refreshInterval = window.setInterval(this.refresh, 60000);
		},
		refresh : function() {
			var self = this;
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
			var today = new Date();
			var month = today.getMonth() + 1;
			var day = today.getDate();
			var year = today.getFullYear();
			var minutes = today.getMinutes();
			var hours = today.getHours();

			if (minutes < 10)
				minutes = "0" + minutes;

			if (hours < 10)
				hours = "0" + hours;

			if (month < 10)
				month = "0" + month;

			if (day < 10)
				day = "0" + day;

			var query = encodeURIComponent(this.options.location) + "/" + year + "/" + month + "/" + day + "/" + hours + "/" + minutes;

			if(isNaN(this.options.location)) {
				this.options.station = this.capitalizeWords(this.options.location);
				$.getJSON("http://data.irail.be/DeLijn/Stations.json?name=" + encodeURIComponent(this.options.station), this.parseStationName);
			} else {
				$.getJSON("http://data.irail.be/DeLijn/Stations.json?id=" + encodeURIComponent(this.options.location), this.parseStationName);
			}
			
			// remote source url - todo: add departures or arrivals
			return "http://data.irail.be/DeLijn/Departures/" + query + ".json?offset=0&rowcount=" + parseInt(this.options.limit);
		},
		parse : function(json) {
			// this.options.station = json.Departures.location.name;
			// parse ajax results
			var liveboard = json.Departures;

			for (var i in liveboard) {
				
				var time = new Date(liveboard[i].time * 1000);
				liveboard[i].time = this.formatTime(time);
				
				if (liveboard[i].delay) {
					var delay = new Date(liveboard[i].delay * 1000 + time.getTimezoneOffset() * 60000);
					liveboard[i].delay = this.formatTime(delay);
				}

				if (!liveboard[i].long_name)
					liveboard[i].long_name = "-";
				else 
					liveboard[i].long_name = this.parseTripName(liveboard[i].long_name)
					
				switch (parseInt(liveboard[i].type)) {
					case 0:
						liveboard[i].type = "tram";
						break;
					default:
						liveboard[i].type = "bus";
						break;
				}
			}

			return liveboard;
		},
		formatTime : function(time) {
			var hours = time.getHours();
			var minutes = time.getMinutes();
			return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
		},
		parseStationName : function (data) {
			this.options.station = this.capitalizeWords(data.Stations[0].name);
			// get walk and bike times from station location
			if(this.options.screen_location){
				var self = this;
				var fromGeocode = self.options.screen_location;
				var toGeocode = data.Stations[0].latitude + "," + data.Stations[0].longitude;
				
				Duration.walking(fromGeocode, toGeocode, function(time){
					if (self.options.walking != self.formatTime(time)) {
						self.options.walking = self.formatTime(time);
						self.trigger("reset");
					}
				});
				Duration.cycling(fromGeocode, toGeocode, function(time){
					if (self.options.bicycling != self.formatTime(time)) {
						self.options.bicycling = self.formatTime(time);
						self.trigger("reset");
					}
				});								
			}
		},
		capitalizeWords: function (strSentence) {
			return strSentence.toLowerCase().replace(/\b[a-z]/g, convertToUpper);
		 
			function convertToUpper() {
				return arguments[0].toUpperCase();
			}
		}, 
		parseTripName: function (strTripName) {
			strTripName = this.capitalizeWords(strTripName);
			
			if(strTripName.split("-").length == 2) {
				strTripName = strTripName.split("-")[1];
			}
			
			return strTripName;
		}
	});

	var view = Backbone.View.extend({
		initialize : function() {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "render");
			
			// bind render to collection reset
			this.collection.bind("reset", this.render);

			// pre-fetch template file and render when ready
			var self = this;
			if (this.template == null) {
				$.get("turtles/delijn/views/list.html", function(template) {
					self.template = template;
					self.render();
				});
			}
		},
		render : function() {
			// only render when template file is loaded
			if (this.template) {
				var data = {
					walking : this.options.walking,
					bicycling : this.options.bicycling,
					station : this.options.station,
					entries : this.collection.toJSON(),
					color : this.options.color,
					error : this.options.error // have there been any errors?
				};
				
				// add html to container
				this.$el.html(Mustache.render(this.template, data));
			}
		}
	});

	// register turtle
	Turtles.register("delijn", {
		collection : collection,
		view : view
	});

})(jQuery);