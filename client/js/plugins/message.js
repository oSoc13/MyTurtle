/*
 * Message
 */
var Message = {

	element : $("#message"),
	timer : null,

	enable : function(text, duration) {
		// check if clock element exists
		if (Message.element.length == 0) {
			Message.element = $('<div id="message"><span class="text-color"></span></div>');
			$("body").prepend(Message.element);
		}
		
		var span = Message.element.find("span");
		span.html(text);
		span.css("margin-top", "-" + (span.height()/2) + "px");
		
		// remove
		if (duration != 0) {
			clearTimeout(Message.timer);
			Message.timer = setTimeout(Message.disable, duration);
		}
		
		Message.element.fadeIn();
	},

	disable : function() {
		// hide message
		Message.element.fadeOut();
	},

	destroy : function() {
		// remove element
		Message.element.remove();
	}

};

// default behaviour
Clock.enable();