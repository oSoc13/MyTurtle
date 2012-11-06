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
	$(".widget header .clock h4").html(timeString);

}

$(window).resize(function(){
	setWidgetsAtStart();
});



function setWidgetsAtStart(){
	
	
	$(".instgrm").each(function(){
		var imgWidth = $(this).width();
		$(this).height(imgWidth);
		$(this).find(".img").css({"width":imgWidth, "height":imgWidth});
	});
	
	$(".via").each(function(){
		var color_prev = $(this).prev().find('.square').attr("data-color");
		color_prevArray = color_prev.split('#');
		color_prev = color_prevArray[1];
		var bgimage_url = "url(client/css/images/arrow" + color_prev + ".png)";
		$(this).css("background-image",bgimage_url);
	});
	
	$(".tweet").each(function(){
		var textWidth = $(this).find('h5').width()+15;
		$(this).find('.speak').css("left",textWidth+"px");
	});
}

function timer(){
	/*RESET ALL YELLOW BARS*/
	/*$(".timerBarYellow").width(0);
	var yellowBar = $(".active .timerBarYellow");
	yellowBar.width(0);
	yellowBar.stop().animate({"width":"100%"}, 20000, function(){
		var old_active = $(".active");
		old_active.next().addClass('active color');
		var last_child = old_active.next().next();
		old_active.removeClass('active color');
		old_active.insertAfter(last_child);
		timer();
		});
	counterBar++;*/
};


