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
    function create(id, pane) {
    	pane.el = $('<section class="pane ' + pane.type + '" id="' + pane.id + '"></section>');
        container.append(pane.el);
        
        panes[id] = pane;
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