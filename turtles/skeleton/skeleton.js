(function($) {

    /*
     * Models are the heart of any JavaScript application, containing the
     * interactive data as well as a large part of the logic surrounding it:
     * conversions, validations, computed properties, and access control. You
     * extend Backbone.Model with your domain-specific methods, and Model
     * provides a basic set of functionality for managing changes.
     */
    var model = Backbone.Model.extend({});

    /*
     * Collections are ordered sets of models. You can bind "change" events to
     * be notified when any model in the collection has been modified, listen
     * for "add" and "remove" events, fetch the collection from the server
     */
    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {

            /*
             * Do stuff when your collection is intialised, suggestions: 
             * - bind events (born, refresh)
             * - fetch collection from remote source using fetch
             * - start refresh timer
             */
            
        }
    });

    /*
     * Backbone views can be used with any JavaScript templating library. The
     * general idea is to organize your interface into logical views, backed by
     * models, each of which can be updated independently when the model
     * changes, without having to redraw the page. Instead of digging into a
     * JSON object, looking up an element in the DOM, and updating the HTML by
     * hand, you can bind your view's render function to the model's "change"
     * event — and now everywhere that model data is displayed in the UI, it is
     * always immediately up to date.
     */
    var view = Backbone.View.extend({
        initialize : function(options) {

            /*
             * Do stuff when your view is intialised, suggestions:
             * - bind events (render, rendered, collection.reset)
             * - initialize templating library
             */
            
        }
    });

    // register turtle
    Turtles.register("skeleton", {
        collection : collection,
        view : view,
        model : model
    });

})(jQuery);