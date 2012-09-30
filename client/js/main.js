$(document).ready(function() {
  var dateObject = new Date();
  var timeString = dateObject.getHours() + ":" + dateObject.getMinutes();
  $(".location .titleBar .clock").html(timeString);
});
