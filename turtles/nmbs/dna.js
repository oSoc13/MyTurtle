(function($) {

	/*
	 * Models are the heart of any JavaScript application, containing the
	 * interactive data as well as a large part of the logic surrounding it:
	 * conversions, validations, computed properties, and access control. You
	 * extend Backbone.Model with your domain-specific methods, and Model
	 * provides a basic set of functionality for managing changes.
	 */
	var model = Backbone.Model.extend({});

	/*
	 * Collections are ordered sets of models. You can bind "change" events to
	 * be notified when any model in the collection has been modified, listen
	 * for "add" and "remove" events, fetch the collection from the server
	 */
	var collection = Backbone.Collection.extend({
		initialize : function(models, options) {

			/*
			 * Do stuff when your collection is intialised. Bind events such as
			 * born and refresh, fetch your collection from a remote source
			 * using fetch.
			 */

			this.fetch();
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
			
			console.log(this);

			var query = this.options.location + "/" + year + "/" + month + "/"
					+ day + "/" + hours + "/" + minutes;
			
			// remote source url - todo: add departures or arrivals
			return "http://data.irail.be/spectql/NMBS/Departures/" + query
					+ "/departures.limit(17):json";
		},
		parse : function(json) {

			/*
			 * Parse is called whenever a collection's models are returned by
			 * the server, in fetch. The function is passed the raw response
			 * object, and should return the array of model attributes to be
			 * added to the collection.
			 */

		}
	});

	/*
	 * Backbone views can be used with any JavaScript templating library. The
	 * general idea is to organize your interface into logical views, backed by
	 * models, each of which can be updated independently when the model
	 * changes, without having to redraw the page. Instead of digging into a
	 * JSON object, looking up an element in the DOM, and updating the HTML by
	 * hand, you can bind your view's render function to the model's "change"
	 * event — and now everywhere that model data is displayed in the UI, it is
	 * always immediately up to date.
	 */
	var view = Backbone.View.extend({
		initialize : function(options) {

			/*
			 * Do stuff when your view is intialised. Bind events such as
			 * render, rendered and collection.reset or initialize your
			 * templating library.
			 */

			this.render();

		},
		render : function() {

			/*
			 * Render your view from the model data and update this.el with the
			 * new generate HTML. You can access your whole collection in JSON
			 * format through this.collection.toJSON().
			 */

			var self = this;

			$.get('turtles/nmbs/template.html', function(html) {
				self.$el.html(html);
			});

		}
	});

	// register turtle
	Turtles.register("nmbs", {
		collection : collection,
		view : view,
		model : model
	});

})(jQuery);