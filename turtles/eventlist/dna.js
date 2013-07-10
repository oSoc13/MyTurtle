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
* @template select the template to render the list
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
                refreshInterval = setInterval(self.refresh, 9000);
            });
        },
        refresh : function() {
            // don't fetch if there are no credentials
            if (this.options.resource == null || !this.options.resource)
                return;

            if (this.length == 0){

                var self = this;
                self.fetch({
                    error : function(d,e) {
                        console.log('errr');
                        // if there are no previous items to show, display a message
                        if(self.length == 0)
                            self.trigger("reset");
                    }
                });
            } else {
                this.trigger("reset");
            }

        },
        url : function() {
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
            var events = json;

            for (var i in events) {
                eventdate = new Date(events[i].startDate);
                events[i].day = eventdate.format("{d}");
                events[i].month = eventdate.format("{mmm}");
            }

            return events;
        },
        nextslide: function(json){
            // 
        }
    });

    var view = Backbone.View.extend({
        initialize : function() {
            // prevents loss of 'this' inside methods
            _.bindAll(this, "render");
            this.current = 0;

            // bind render to collection reset
            this.collection.on("reset", this.render);

            // pre-fetch template file and render when ready
            var self = this;
            if(this.template == null) {
                $.get("turtles/eventlist/views/" + this.options.template + ".html", function(template) {
                    self.template = template;
                    self.render();
                });
            }
        },
        render : function() {
            // only render when template file is loaded
            if(this.template) {
                var data = {
                    entries : this.collection.at(this.current).toJSON()
                 };
                 console.log(this.current);
                 this.current++;
                 if(this.current == this.collection.length){
                    this.current = 0;
                 }

                // add html to container
                this.$el.empty();
                this.$el.html(Mustache.render(this.template, data));

                // Temp hack for fullscreen
                //TODO: implement fullscreen option in FlatTurtle Framework
                this.$el.css( "position", "absolute" )
                        .css( "top", "0" )
                        .css( "left", "0" )
                        .css( "right", "0" )
                        .css( "bottom", "0" )
                        .css( "margin", "0" )
                        .css( "z-index", "111110" )
                        .prependTo("body");
            }
        }
    });

    // register turtle
    Turtles.register("eventlist", {
        collection : collection,
        view : view
    });

})(jQuery);
