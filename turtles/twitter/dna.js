(function($) {
	
	var collection = Backbone.Collection.extend({
		initialize : function(models, options) {
			// fetch data when born
			this.bind("born", this.fetch);
			
			// default hashtag
			if (!options.search)
				options.search = "flatturtle";
		},
		url : function() {
			// remote source url
			return "http://data.irail.be/spectql/twitter/search/" + encodeURIComponent(this.options.search) + "/results.limit(5):json";
		},
		parse : function(json) {
			var tweets = json.spectql;

			// process tweets
			for (var i in tweets) {
				// time ago string
				tweets[i].minutes = parseInt(tweets[i].created_at.replace("'", ""));
				
				// #tags
				tweets[i].text = tweets[i].text.replace(/(#[^\s]+)/g, '<span class="text-color">$1</span>');
				// @replies
				tweets[i].text = tweets[i].text.replace(/(@[^\s]+)/g, '<span class="text-color">$1</span>');
				// links                                  [   https://www.   |www.| domain.| ... ]
				tweets[i].text = tweets[i].text.replace(/((https?:\/\/(\w\.)*|\w\.)[^\s]+\.[^\s]+)/g, '<span class="text-color">$1</span>');
			}
			
			return tweets;
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
			if(this.template == null) {
				$.get("turtles/twitter/views/widget.html", function(template) {
					self.template = template;
					self.render();
				});
			}
		},
		render : function() {
			// only render when template file is loaded
			if(this.template) {
				var data = {
					search : this.options.search,
					entries : this.collection.toJSON()
				};
				
				// add html to container
				this.$el.html(Mustache.render(this.template, data));
			}
		}
	});

	// register turtle
	Turtles.register("twitter", {
		collection : collection,
		view : view
	});

})(jQuery);
