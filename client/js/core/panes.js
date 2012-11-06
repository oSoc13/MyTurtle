/*
 * The panes object will take care of the available panes
 */
window.Panes = (function() {

    // the container element
    var container = $('div#container');
    
    // current panes
    var panes = [];

    // hold a list of timers for each group
    var timers = {};
    
    /*
     * Create a new pane
     */
    function create(id, pane) {
    	// save pane
    	panes[id] = pane;
    	
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
    		
    		header.append($('<div class="nav" data-pane="' + id + '">' + pane.title + '</div>'));
    	}
    	
    	// create first timer for rotation if more than 2 panes
		if (group.find('.pane').length > 1 && timers[pane.type] == null) {
			timers[pane.type] = setTimeout(function() {
				rotate(pane.type);
			}, pane.interval);
		}
		
    	// create and insert dom element
    	pane.el = $('<section class="pane" data-id="' + id + '"></section>');
    	group.append(pane.el);

        // check if first pane and mark as active if so
    	if (group.find('.pane.active').length == 0) {
    		show(id);
    	}
    }
    
    /*
     * Rotate to the next pane in a group
     */
    function rotate(group) {
    	// stop previous timeout if it is still running
    	clearTimeout(timers[group]);
    	
    	// get the group and current active pane
    	var group = $('.group.' + group);
    	var active = group.find('.pane.active');
    	
    	// get the next pane
    	var next = active.next();
    	if (next.length == 0) {
    		next = group.find('.pane').first();
    	}
    	
    	// get the pane object
    	var id = next.data('id');
    	var pane = panes[id];
    	
    	// create timer for next rotation
    	timers[pane.type] = setTimeout(function() {
			rotate(pane.type);
		}, pane.interval);
    	
    	// show next pane
    	show(id);
    }
    
    /*
     * Switch to a pane by id
     */
    function show(id) {
    	if (panes[id] == null)
    		return;
    	
    	var pane = panes[id];
    	var group = $('.group.' + pane.type);
    	
    	// switch tabs
    	if (pane.type == 'widget') {
    		var header = group.find('header');
    		
    		// mark as tab active and put in front
    		header.find('.active').appendTo(header).removeClass("active");
    		var active = header.find('.nav[data-pane="' + id + '"]').addClass("active");
    	}
    	
    	// mark pane as active and show
    	group.find('.pane').removeClass("active").hide();
    	pane.el.addClass("active").show();
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
    	show : show,
    	rotate : rotate,
        create : create,
        get : get
    };

}());