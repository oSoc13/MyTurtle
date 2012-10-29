/*
 * This is a turtle breeding object that grows turtles.
 */
window.Breeder = (function() {
    
    function grow(type, id, options) {
        // default turtle configuration
        var defaults = {
            lang : 'eng',
            source : 'turtles/' + type + '/' + type + '.js'
        };

        // options must be an object
        if (options == null || typeof options != 'object') {
            options = {};
        }
        
        // add missing default options
        option = _.extend(defaults, options);

        // fetch the turtle script only once
        if (!Turtles.registered(type)) {
            console.log('load script');
            $.ajax({
                url : options.source,
                dataType : 'script',
                async : false, // to prevent duplicate javascript file loading
                success : function() {
                    Turtles.instantiate(type, id, options);
                }
            });
        } else {
            console.log('known turtle');
            Turtles.instantiate(type, id, options);
        }
    }
    
    /*
     * Public interface to this object
     */
    var Breeder = {
        grow : grow
    };

    return Breeder;

}());