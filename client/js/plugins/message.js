/*
 * Message
 */
var Message = {

	element : $("#message"),
	timer : null,

	enable : function(text, duration) {
		// check if clock element exists
		if (Message.element.length == 0) {
			Message.element = $('<div id="black-screen"><h1 class="text-color"></h1></div>');
			$("body").prepend(Message.element);
		}
		
		var msg = Message.element.find("h1");
		msg.html(text);
		msg.css("margin-top", "-" + (msg.height()/2) + "px");
		
		// remove
		if (duration != null) {
			clearTimeout(Message.timer);
			Message.timer = setTimeout(Message.disable, duration);
		}
		
		Message.element.fadeIn();
	},

	disable : function() {
		// hide message
		Message.element.fadeOut();
		clearTimeout(Message.timer);
	},

	destroy : function() {
		// remove element
		Message.element.remove();
		clearTimeout(Message.timer);
	}

};

// default behaviour
Clock.enable();