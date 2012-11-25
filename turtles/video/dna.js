(function($){
    
    var view = Backbone.View.extend({

	initialize : function() {
            var self = this; 
	    $.get('turtles/video/views/widget.html', function(template) {
		var data = {
		    location : self.options.location
		};
		// set window height to load
		self.$el.height('100%');
		// render html
		self.$el.html(Mustache.render(template, data));
		// change turtle padding
		self.$el.addClass('nopadding');
                //make a difference between the Qt Browser used by FlatTurtle customers and normal browser users
                if(typeof application === 'undefined'){
                    //for normal browsers, let's use HTML5
                    $("#videocanvas").html("<video src='" + self.options.location + "' autoplay=autoplay width=100% height=100%></video>");
                }
                self.render();
	    });
	    this.bind("shown", this.shown);
	},
	render : function(){
            player.playfile(this.options.location);
	},
        shown : function(){
//            if(typeof application !== 'undefined')
//                player.replay();
            player.playfile(this.options.location);
	}
    });
    
    // register turtle
    Turtles.register("video", {
	view : view
    });
    
})(jQuery);

