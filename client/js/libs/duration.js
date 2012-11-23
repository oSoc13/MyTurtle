/*
 * FlatTurtle
 * @author: Michiel Vancoillie
 * @license: AGPLv3
 */

window.Duration = (function() {
	/*
	 * Calculate walking duration for route
	 */
	function walking(from, to, callback){
		Duration.calculate('WALK', from, to, callback);
	}

	/*
	 * Calculate bike duration for route
	 */
	function cycling(from, to, callback){
		Duration.calculate('BICYCLE', from, to, callback);
	}

	/*
	 * Core function
	 */
	function calculate(mode, from, to, callback){
		$.ajax({
			url: "http://data.irail.be/Geo/Distance/" + from + "/" + to + ".json?mode=" + mode,
			headers: {
				'Accept' : 'application/json'
			},
			dataType: 'jsonp',
			success: function(data) {
				if(data.Distance != null && data.Distance.duration){
					// Cancel timezone effect
					var UTC = new Date();
					var time = new Date(data.Distance.duration + (UTC.getTimezoneOffset()*1000*60));
					callback(time);
				}
			}
		});
	}

	/*
     * Public interface to this object
     */
	return {
		walking : walking,
		cycling : cycling,
		calculate: calculate
	};
}());