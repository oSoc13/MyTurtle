/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @author: Ah-Lun Tang (tang@ahlun.be)
 * @license: AGPLv3
 */

/**
* Turtle README
*
* Turtle for featured event.
*
* Required options
* @resource location of the resource with the events (items must follow http://schema.org/Event).
* @user username for authentication if resource is protected
* @pass password for authentication if resource is protected
* @eventid identification for event
*/
(function($) {

    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            var self = this;
            // prevents loss of 'this' inside methods
            _.bindAll(this, "refresh");

            // fetch data when born
            this.on("born", this.refresh);
            this.on("refresh", this.refresh);
            this.on("reconfigure", this.refresh);
            this.on("parsegeo", this.parse_geo);

            // get the google maps api
            $.getScript("//maps.google.com/maps/api/js?sensor=false&callback=geoLoaded");

            // automatic collection refresh each minute, this will
            // trigger the reset event
            setTimeout(function(){
                refreshInterval = setInterval(self.refresh, 60000);
            }, Math.round(Math.random()*5000));
        },
        refresh : function() {
            // don't fetch if there are no credentials
            if (this.options.resource == null || !this.options.resource)
                return;

            var self = this;
            self.fetch({
                error : function(d,e) {
                    console.log('errr');
                    // if there are no previous items to show, display a message
                    if(self.length == 0)
                        self.trigger("reset");
                }
            });
        },
        url : function() {
            //return "https://" + encodeURIComponent(this.options.user) + ":" + encodeURIComponent(this.options.password) + "@datahub.westtoer.be/sets/win/events.json";
            return this.options.resource;
        },
        parse_object : function(object) {
            /**
            * check if object is an empty object or contains a usable value.
            *
            * @method parse_object
            * @param {Object} the object to check
            * @return {Boolean| Object} Returns false if empty, returns object if not empty.
            */
            if(jQuery.isEmptyObject(object))
                return false;
            else
                return object;
        },
        parse_geo : function() {
            console.log("collection:" + this.collection.models);
            for (var i in this.collection) {
                var temp_location = this.collection[i].location.split('/'); 
                temp_location = temp_location[temp_location.length-1]; // remove the rdf namespace for location
                temp_location = temp_location.split(','); // split latitude and longitude
                console.log(temp_location[temp_location.length-1]);

                var geocoder = new google.maps.Geocoder();
                var latLng = new google.maps.LatLng(temp_location[0],temp_location[1]);

                if (geocoder) {
                    geocoder.geocode({ 'latLng': latLng}, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            console.log(results[0].formatted_address);
                        }
                        else {
                            console.log("Geocoding failed: " + status);
                        }
                    });
                }
            }
            self.trigger("render");
        },
        parse : function(json) {

            // TODO: select event from correct id when semantic resource is completed
            // use this.options.eventid
            var current_event = json[this.options.eventid];
            
            /*
            // reformat event from set
            // TODO: delete when resource follows http://schema.org/Event
            current_event.name = this.parse_object(current_event.ID1_titel) || this.parse_object(current_event.ID1_titel_fr) || 
                                 this.parse_object(current_event.ID1_titel_en) || this.parse_object(current_event.ID1_titel_du);
            current_event.location =  this.parse_object(current_event.ID18_straat) || this.parse_object(current_event.ID28_straat); 
            current_event.location += " ";
            current_event.location += this.parse_object(current_event.ID19_nummer) || this.parse_object(current_event.ID29_nr);
            current_event.image = this.parse_object(current_event.ID14b_productbeeld) || null;
            current_event.description = this.parse_object(current_event.ID2_beschrijving) || this.parse_object(current_event.ID2_beschrijving_fr) ||
                                        this.parse_object(current_event.ID2_beschrijving_en) || this.parse_object(current_event.ID2_beschrijving_du);
            // END TODO: delete until here
            */
            this.trigger("parsegeo");
            return current_event;
        }
    });

    var view = Backbone.View.extend({
        initialize : function() {
            // prevents loss of 'this' inside methods
            _.bindAll(this, "render");

            // bind render to collection reset
            this.collection.on("reset", this.render);

            // pre-fetch template file and render when ready
            var self = this;
            if(this.template == null) {
                $.get("turtles/eventdetail/views/widget.html", function(template) {
                    self.template = template;
                    self.render();
                });
            }
        },
        render : function() {
            // only render when template file is loaded
            if(this.template) {
                var data = {
                    entries : this.collection.toJSON()
                 };

                // add html to container
                this.$el.empty();
                this.$el.html(Mustache.render(this.template, data));
            }
        }
    });

    // register turtle
    Turtles.register("eventdetail", {
        collection : collection,
        view : view
    });

})(jQuery);

// callback when the google maps api is ready
if (typeof geoLoaded != "function") {
    function geoLoaded() {
        // trigger for all map turtles
        Turtles.trigger("eventdetail", "parsegeo");
    }
}
