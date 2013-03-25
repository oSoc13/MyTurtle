/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @author: Michiel Vancoillie (michiel@irail.be)
 * @license: AGPLv3
 */

(function($) {

    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            // prevents loss of 'this' inside methods
            _.bindAll(this, "refresh", "configure", "getConnections");

            // bind events
            this.on("born", this.configure);
            this.on("born", this.refresh);
            this.on("refresh", this.refresh);
            this.on("reconfigure", this.configure);

            // default error value
            options.error = false;

            // array for holding open request and objects
            this.openRequests = [];
            this.openRequestsObjects = [];
            this.liveboard = [];

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
            this.trigger("reset");

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
            var self = this;

            // parse ajax results
            this.liveboard = null;
            this.liveboard = json.spectql;

            // abort previous requests
            for (var i in this.openRequests){
                this.openRequests[i].abort();
                this.openRequests[i] = null;
            }
            this.openRequests = [];
            this.openRequestsObjects = [];

            // loop throught train results
            for (var i in this.liveboard) {
                var vehicle = encodeURIComponent(this.liveboard[i].vehicle);
                if(this.options.destination){
                    // Start new AJAX request for a waypoint
                    (function (i) {
                        var xhr = {
                            url: "http://api.irail.be/vehicle/?id="+vehicle + "&format=json",
                            async: true,
                            success: function(data){
                                data = JSON.parse(data);
                                self.getConnections(data, clone(i));
                            }
                        }
                        self.openRequestsObjects.push(xhr);
                    })(i);
                }

                if(this.liveboard[i].time){
                    var time = new Date(this.liveboard[i].time * 1000);
                    this.liveboard[i].time = time.format("{H}:{M}");

                    if (this.liveboard[i].delay) {
                        var delay = new Date(this.liveboard[i].delay * 1000 + time.getTimezoneOffset() * 60000);
                        this.liveboard[i].delay = delay.format("{H}:{M}");
                    }
                }

                if (this.liveboard[i].direction){
                    this.liveboard[i].direction = this.liveboard[i].direction.capitalize();
                }

                if (!this.liveboard[i].platform.name)
                    this.liveboard[i].platform.name = "-";

                this.liveboard[i].type = this.liveboard[i].vehicle.match(/\.([a-zA-Z]+)[0-9]+$/)[1];
                if (!this.liveboard[i].type)
                    this.liveboard[i].type = "-";
            }

            for (var i in this.openRequestsObjects){
                var xhr = $.ajax(this.openRequestsObjects[i]);
                this.openRequests.push(xhr);
            }

            self.trigger("reset");

            return this.liveboard;
        },
        getConnections : function(data, i){
            var self = this;
            console.log(i);
            if(data.stops && data.stops.stop && data.stops.stop.length > 2){
                var stoparray = data.stops.stop;

                var pastStart = false;
                for(var j=0; j<stoparray.length-1 ; j++){
                    if(!pastStart && stoparray[j].station.toLowerCase() == self.options.location.toLowerCase()){
                        pastStart = true;
                    }else if(pastStart && stoparray[j].station.toLowerCase() == self.options.destination.toLowerCase()){
                        var viaTime = new Date(stoparray[j].time * 1000);
                        stoparray[j].time = viaTime.format("{H}:{M}");
                        self.liveboard[i].via = stoparray[j];
                        self.trigger("reset");

                        break;
                    }
                }
            }
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
                    entries : this.collection.liveboard,
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