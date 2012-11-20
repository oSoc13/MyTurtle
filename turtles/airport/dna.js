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
            
            // get the airport name
            $.ajax({
                url: "http://data.irail.be/spectql/Airports/Stations%7Bname,code,longitude,latitude%7D?code=='" + self.options.location + "':json",
                dataType: "json",
                success: function(data) {
                    if (data.spectql.length > 0) {
                        // detect airport name change
                        if (self.options.airport != data.spectql[0].name) {
                            self.options.airport = data.spectql[0].name;
                            self.trigger("reset");
                            
                            // get walk and bike times with airport name
                            if(self.options.screen_location){
                                var fromGeocode = self.options.screen_location;
                                var toGeocode = data.spectql[0].latitude + "," + data.spectql[0].longitude;
                                
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
            var query = this.options.location + "/" + today.format("{Y}/{m}/{d}/{H}/{M}");

            // remote source url
            // todo: add departures or arrivals
            return "http://data.irail.be/spectql/Airports/Liveboard/" + query + "/departures.limit(" + parseInt(this.options.limit) + "):json";
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
            }
            
            return liveboard;
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
                    bicycling : this.options.bicycling,
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