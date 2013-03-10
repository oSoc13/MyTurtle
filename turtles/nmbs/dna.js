/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

(function($) {

    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            // prevents loss of 'this' inside methods
            _.bindAll(this, "refresh", "configure");

            // bind events
            this.on("born", this.configure);
            this.on("born", this.refresh);
            this.on("refresh", this.refresh);
            this.on("reconfigure", this.configure);

            // default error value
            options.error = false;

            // default limit
            if (!options.limit)
                options.limit = 5;

            // automatic collection refresh each minute, this will
            // trigger the reset event
            refreshInterval = window.setInterval(this.refresh, 60000);
        },
        configure : function() {
            // Walking time
            var hours = Math.floor(this.options.time_walk/60);
            var minutes = Math.floor(this.options.time_walk%60);
            if(hours == 0 && minutes == 0){
                this.options.time_walk = "< 1 min";
            }else if(this.options.time_walk < 0){
                this.options.time_walk = false;
            }else{
                if(hours< 10) hours = '0' + hours;
                if(minutes< 10) minutes = '0' + minutes;
                this.options.time_walk = hours + ':' + minutes;
            }

            // don't fetch if there is no location
            if (this.options.location == null || !this.options.location)
                return;

            var today = new Date();
            var query = encodeURIComponent(this.options.location) + "/" + today.format("{Y}/{m}/{d}/{H}/{M}");

            var self = this;
            $.getJSON("http://data.irail.be/NMBS/Liveboard/" + query + ".json", function(data) {
                if (data.Liveboard.location.name != undefined) {
                    self.options.station = data.Liveboard.location.name.capitalize();
                    self.trigger("reset");
                }
            });
        },
        refresh : function() {
        	// don't fetch if there is no location
            if (this.options.location == null || !this.options.location)
                return;

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
            var query = encodeURIComponent(this.options.location) + "/" + today.format("{Y}/{m}/{d}/{H}/{M}");

            return "http://data.irail.be/spectql/NMBS/Liveboard/" + query + "/departures.limit(" + parseInt(this.options.limit) + "):json";
        },
        parse : function(json) {
            // parse ajax results
            var liveboard = json.spectql;

            for (var i in liveboard) {
                var time = new Date(liveboard[i].time * 1000);
                liveboard[i].time = time.format("{H}:{M}");

                if (liveboard[i].delay) {
                    var delay = new Date(liveboard[i].delay * 1000 + time.getTimezoneOffset() * 60000);
                    liveboard[i].delay = delay.format("{H}:{M}");
                }

                if (!liveboard[i].platform.name)
                    liveboard[i].platform.name = "-";

                liveboard[i].type = liveboard[i].vehicle.match(/\.([a-zA-Z]+)[0-9]+$/)[1];
                if (!liveboard[i].type)
                    liveboard[i].type = "-";
            }

            return liveboard;
        }
    });

    var view = Backbone.View.extend({
        initialize : function() {
            // prevents loss of "this" inside methods
            _.bindAll(this, "render");

            // bind render to collection reset
            this.collection.on("reset", this.render);

            // pre-fetch template file and render when ready
            var self = this;
            if (this.template == null) {
                $.get("turtles/nmbs/views/list.html", function(template) {
                    self.template = template;
                    self.render();
                });
            }
        },
        render : function() {
            // only render when template file is loaded
            if (this.template) {
                var data = {
                    station : this.options.station || this.options.location,
                    entries : this.collection.toJSON(),
                    color : this.options.color,
                    time_walk : this.options.time_walk,
                    error : this.options.error // have there been any errors?
                };

                // add html to container
                this.$el.empty();
                this.$el.html(Mustache.render(this.template, data));
            }
        }
    });

    // register turtle
    Turtles.register("nmbs", {
        collection : collection,
        view : view
    });

})(jQuery);