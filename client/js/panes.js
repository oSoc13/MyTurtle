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
    	// search group
    	var group = $('.group.' + pane.type);
    	
    	// create group if needed
    	if (group.length == 0) {
    		group = $('<section class="group ' + pane.type + '"></section>');
    		container.append(group);
    	}
    	
    	// show tabs
    	if (pane.type == 'widget') {
    		var header = group.find('header');
    		if (header.length == 0) {
    			header = $('<header></header>');
    			group.prepend(header);
    		}
    		
    		header.append($('<div class="nav" data-pane="' + id + '">' + pane.title + '</div>'))
    	}
    	
    	// get the header
		var header = group.find('header');
		if (header.length == 0) {
			header = $('<header></header>');
			group.prepend(header);
		}
    	
    	pane.el = $('<section class="pane" data-id="' + id + '"></section>');
        group.append(pane.el);
        
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