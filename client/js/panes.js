/*
 * The panes object will take care of the available panes
 */
window.Panes = (function() {

    // the container element
    var container = $('div#container');
    
    // current panes
    var panes = [];

    /*
     * Create a new pane
     */
    function create(type, id) {
        panes[id] = $('<section class="pane ' + type + '" id="' + id + '"></section>');
        container.append(panes[id]);
        
        return panes[id];
    }
    
    /*
     * Get a panel by id
     */
    function get(id) {
        return panes[id];
    }

    /*
     * Public interface to this object
     */
    return {
        create : create,
        get : get
    };

}());