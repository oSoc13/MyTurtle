/* 
 * FlatTurtle
 * Google Analytics plugin
 * 
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

var _gaq = _gaq || [];
  
var Google = {
		
	enable : function(account) {
		_gaq.push(['_setAccount', account]);
		_gaq.push(['_trackPageview']);
		
		(function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	},
	
	disable : function() {
		// there is not point disabling this plugin
	}
		
};