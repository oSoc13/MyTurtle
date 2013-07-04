/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @author: Ah-Lun Tang (tang@ahlun.be)
 * @license: AGPLv3
 */

/**
* Turtle README
*
* Turtle for listing events.
*
* Required options
* @resource location of the resource with the events (items must follow http://schema.org/Event).
* @user username for authentication if resource is protected
* @pass password for authentication if resource is protected
* @count number of items in the list
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



            // automatic collection refresh each minute, this will
            // trigger the reset event
            setTimeout(function(){
                refreshInterval = setInterval(self.refresh, 60000);
            }, Math.round(Math.random()*5000));
        },
        refresh : function() {
            // don't fetch if there are no credentials
            if (this.options.user == null || !this.options.user || this.options.password == null || !this.options.password)
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
            console.log(object)
            if(jQuery.isEmptyObject(object))
                return false;
            else
                return object;
        },
        parse : function(json) {
            console.log(json);
            var events = json.events.event.slice(0,this.options.count);

            // reformat events from set
            // TODO: delete when resource follows http://schema.org/Event
            for (var i in events) {
                // http://schema.org/Event

                // code for parsing object from resource based on set
                events[i].name = this.parse_object(events[i].ID1_titel) || this.parse_object(events[i].ID1_titel_fr) || 
                                 this.parse_object(events[i].ID1_titel_en) || this.parse_object(events[i].ID1_titel_du);
                events[i].location =  this.parse_object(events[i].ID18_straat) || this.parse_object(events[i].ID28_straat); 
                events[i].location += " ";
                events[i].location += this.parse_object(events[i].ID19_nummer) || this.parse_object(events[i].ID29_nr);
                events[i].image = this.parse_object(events[i].ID14b_productbeeld) || null;
                // end code for parsing object from resource based on set
            }
            // END TODO: delete until here

            return events;
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
                $.get("turtles/eventlist/views/widget.html", function(template) {
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
    Turtles.register("eventlist", {
        collection : collection,
        view : view
    });

})(jQuery);
