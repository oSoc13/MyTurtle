/*
 * FlatTurtle
 * Wrapper Qt Browser application object
 *
 * @author: Jens Segers (jens@irail.be)
 * @author: Michiel Vancoillie
 * @license: AGPLv3
 */

var Power = {

	enable : function() {
		if (typeof application == "object")
			application.enableScreen(true);
	},

	disable : function() {
        //disabled turning off the screen here: the MyTurtleSleep page will turn it off after 3s
		document.location.href = '../sleep';
	},

	destroy : function() {}

};