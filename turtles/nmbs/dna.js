/* 
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

(function($) {

    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            // prevents loss of "this" inside methods
            _.bindAll(this, "refresh");
            _.bindAll(this, "parseStation");

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
            
            // get station name
            $.getJSON("http://data.irail.be/NMBS/Liveboard/" + query + ".json", this.parseStation);

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
        },
        parseStation : function(data) {
            // get walk and bike times from station location
            if(this.options.screen_location){
                var self = this;
                var fromGeocode = self.options.screen_location;
                var toGeocode = data.Liveboard.location.latitude + "," + data.Liveboard.location.longitude;
                
                Duration.walking(fromGeocode, toGeocode, function(time){
                    if (self.options.walking != time.format("{H}:{M}")) {
                        self.options.walking = time.format("{H}:{M}");
                        self.trigger("reset");
                    }
                });
                Duration.cycling(fromGeocode, toGeocode, function(time){
                    if (self.options.bicycling != time.format("{H}:{M}")) {
                        self.options.bicycling = time.format("{H}:{M}");
                        self.trigger("reset");
                    }
                });                                
            }
        }
    });

    var view = Backbone.View.extend({
        initialize : function() {
            // prevents loss of "this" inside methods
            _.bindAll(this, "render");

            // bind render to collection reset
            this.collection.bind("reset", this.render);

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
                    station : this.options.location,
                    walking : this.options.walking,
                    bicycling : this.options.bicycling,
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
    Turtles.register("nmbs", {
        collection : collection,
        view : view
    });

})(jQuery);