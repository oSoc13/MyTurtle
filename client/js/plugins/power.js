/*
 * FlatTurtle
 * Wrapper Qt Browser application object
 *
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

var Power = {

	enable : function() {
		if (typeof application == "object")
			application.enableScreen(true);
	},

	disable : function() {
		if (typeof application == "object")
			application.enableScreen(false);

		document.location.href = '../sleep';
	},

	destroy : function() {}

};