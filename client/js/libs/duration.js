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
			url: "http://opentripplanner.eu:8080/opentripplanner-api-webapp/ws/plan/?mode=" + mode + "&fromPlace=" + from + "&toPlace=" + to,
			headers: {
				'Accept' : 'application/json'
			},
			dataType: 'jsonp',
			success: function(data) {
				if(data.plan != null && data.plan.itineraries[0].duration){
					// Cancel timezone effect
					var UTC = new Date();
					var time = new Date(data.plan.itineraries[0].duration + (UTC.getTimezoneOffset()*1000*60));
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