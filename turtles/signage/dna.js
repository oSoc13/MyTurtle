/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

(function($){

    var view = Backbone.View.extend({

		initialize : function() {
		    this.on("born", this.render);
		},
		render : function() {
			var self = this;

			$.get("turtles/signage/views/widget.html", function(template) {
				// render html
				self.$el.empty();
				self.$el.html(Mustache.render(template));
			});
		}
    });

	// register turtle
	Turtles.register("signage", {
		view : view
	});

})(jQuery);