var timer;
var yellowBar = $(".timerBarYellow");
var counterBar = 0;

$(document).ready(function() {
  setWidgetsAtStart();
  timer();
  setTimeOnScreen();
});

window.setInterval(setTimeOnScreen, 500);

function setTimeOnScreen(){
	var dateObject = new Date();
	var minutes = dateObject.getMinutes();
	var minutes = "" + minutes;
	if(minutes.length==1){
		var timeString = dateObject.getHours() + ":0" + minutes;
	}
	else{
		var timeString = dateObject.getHours() + ":" + minutes;
	}
	$(".location .titleBar .clock").html(timeString);

}

$(window).resize(function(){
	setWidgetsAtStart();
	timer();
});


/* FUNCTION TO SET INSTAGRAM IMAGE WITH RIGHT WIDTH AND HEIGHT*/
function setWidgetsAtStart(){
	$(".instgrm").each(function(){
		var widthImg = $(this).width();
		$(this).height(widthImg);
		$(this).find(".img").css({"width":widthImg, "height":widthImg});
	});
	
	$(".tweet").each(function(){
		var widthText = $(this).find('h5').width();
		widthText = parseInt(widthText + 5);
		
		
	});
	
	
}

function timer(){
	yellowBar.width(0);
	var offset = $(".active").position().left;
	var widthBar = $(".active").width();
	yellowBar.css("left",offset);
	yellowBar.animate({"width":widthBar}, 20000, function(){
		var old_active = $(".active");
		old_active.next().addClass('active color');
		var last_child = old_active.next().next();
		old_active.removeClass('active color');
		old_active.insertAfter(last_child);
		timer();
		});
	counterBar++;
};


