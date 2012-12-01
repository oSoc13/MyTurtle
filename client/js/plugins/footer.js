/* 
 * FlatTurtle
 * Footer RSS plugin
 * 
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

var Footer = {

    original : $("footer #where"),
	element  :null,

	enable : function(feed) {
	    $.getJSON("//www.google.com/reader/public/javascript/feed/" + feed + "?callback=?", function(data) {
	        var items = data.items.slice(0,5);
	        
	        // hide original message
	        Footer.original.hide();
	        
	        // create marquee element
	        Footer.element = $('<marquee id="' + Footer.original.attr('id') + '" class="' + Footer.original.attr('class') + '"></marquee>');
	        
	        // create content
	        for(var i in items) {
	            Footer.element.append('<span>' + items[i]['title'] + '</span>');
	        }
	        
	        $("footer").append(Footer.element);
	    });
	},

	disable : function() {
	    // enable marquee style
	    Footer.element.remove();
	    
	    // restore original message
	    Footer.original.show();
	    
	},

	destroy : function() {
	}

};