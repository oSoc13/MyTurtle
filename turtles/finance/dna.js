/*
 * FlatTurtle
 * @author: Michiel Vancoillie
 * @license: AGPLv3
 */

 (function($){

	var collection = Backbone.Collection.extend({
		initialize : function(models, options) {

		}
	});

	var view = Backbone.View.extend({

		initialize : function() {
			this.on("born", this.render);
		},
		render : function() {
			var self = this;

			$.get("turtles/finance/views/widget.html", function(template) {
				// render html
				self.$el.empty();
				self.$el.html(Mustache.render(template));
			});
		}
	});

	// register turtle
	Turtles.register("finance", {
		collection : collection,
		view : view
	});

})(jQuery);