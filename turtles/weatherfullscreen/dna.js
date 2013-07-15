/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @author: Ah-Lun Tang (tang@ahlun.be)
 * @license: AGPLv3
 */

/**
* Turtle README
*
* Turtle for fullscreen weather.
*
* Required options
* @resource location of the resource with the events and attractions
* @template select the template to render the list
* @timeout timeout for slides
* @count hide this panel after x slides
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
            var weather_items = json;

            return weather_items;
        }
    });

    var view = Backbone.View.extend({
        initialize : function() {
            // prevents loss of 'this' inside methods
            _.bindAll(this, "render");
            _.bindAll(this, "pause");
            this.current = 0;

            // bind render to collection reset
            this.collection.on("reset", this.render);
            this.collection.on("render", this.render);

            // pre-fetch template file and render when ready
            var self = this;
            if(this.template == null) {
                $.get("turtles/weatherfullscreen/views/" + this.options.template + ".html", function(template) {
                    self.template = template;
                    Panes.fullscreen(5,0);
                    self.render();
                
                });
            }

        },
        pause : function(){
            Panes.close(this.options.thispaneid);
        },
        render : function() {
            var self = this;
            // only render when template file is loaded
            if(this.template) {
                var data = {
                    entries : this.collection.at(this.current).toJSON()
                 };

                 // prepare index for content for next slide
                 console.log(this.current++);
                 if(this.current == this.collection.length){
                    this.current = 0;
                 }

                // add html to container
                this.$el.empty();
                this.$el.html(Mustache.render(this.template, data));

                // hack: if not first and a multiple of `count`: pause slides,
                // else render again with new index.
                if(this.current != 0 && this.current % this.options.count == 0 ){
                    setTimeout(self.pause,this.options.timeout);
                } else {
                    setTimeout(self.render,this.options.timeout);
                }
            }
        }
    });

    // register turtle
    Turtles.register("weatherfullscreen", {
        collection : collection,
        view : view
    });

})(jQuery);
