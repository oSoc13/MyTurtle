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
    	
    	// create dom element
        pane.el = $('<section class="pane" data-id="' + id + '"></section>');
    	
    	// search group
    	var group = $('.group.' + pane.type);
    	
    	// create group if needed
    	if (group.length == 0) {
    		group = $('<section class="group ' + pane.type + '"></section>');
    		container.append(group);
    	}
    	
    	// widget mode
    	if (pane.type == 'widget') {
    		var header = group.find('header');
    		if (header.length == 0) {
    			header = $('<header></header>');
    			group.prepend(header);
    		}
    		
    		// append header
    		header.append($('<div class="nav" data-pane="' + id + '"><div class="progress"></div>' + pane.title + '</div>'));
    		
    		// add color to group
    		group.addClass('bg-color');
    	}
    	
    	// create first timer for rotation if more than 2 panes
		if (group.find('.pane').length > 1 && timers[pane.type] == null) {
			timers[pane.type] = setTimeout(function() {
				rotate(pane.type);
			}, pane.interval);
		}
		
    	// append element
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
    	// get the group and current active pane
    	var group = $('.group.' + group);
    	var active = group.find('.pane.active');
    	
    	// get the next pane
    	var next = active.next();
    	if (next.length == 0) {
    		next = group.find('.pane').first();
    	}
    	
    	// show next pane
    	show(next.data('id'));
    }
    
    /*
     * Switch to a pane by id
     */
    function show(id) {
    	if (panes[id] == null)
    		return;
    	
    	var pane = panes[id];
    	var group = $('.group.' + pane.type);
    	
    	// stop previous timeout if it is still running
    	clearTimeout(timers[pane.type]);
    	
    	// switch tabs
    	if (pane.type == 'widget') {
    		var header = group.find('header');
    		
    		// mark as tab active and put in front
    		header.find('.active').appendTo(header).removeClass("active bg-color");
    		var active = header.find('.nav[data-pane="' + id + '"]').addClass("active bg-color").prependTo(header);
    		
    		// start animation
    		header.find('.progress').stop().width(0);
    		header.find('.active .progress').animate({width:"100%"}, parseInt(pane.interval), function() {
    			$(this).width(0);
    		});    		
    	}
    	
    	// mark pane as active and show
    	group.find('.pane').removeClass("active");
    	pane.el.addClass("active");
    	
    	// create timer for next rotation
    	timers[pane.type] = setTimeout(function() {
			rotate(pane.type);
		}, pane.interval);
    }
    
    /*
     * Sort turtles in a pane by id
     */
    function sort(group) {
        var group = $('.pane[data-id="' + group + '"]');
        var list = group.find('.turtle').get();
        
        // sort by data-order attribute
        list.sort(function(a, b) {
            // both are plain javascript objects now
            if (a.getAttribute('data-order') == b.getAttribute('data-order'))
                return 0;
            return a.getAttribute('data-order') < b.getAttribute('data-order') ? -1 : 1;
        });
        
        $.each(list, function(idx, itm) { group.append(itm); });
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
    	sort : sort,
        create : create,
        get : get
    };

}());