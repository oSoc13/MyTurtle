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



function setWidgetsAtStart(){
	var docHeight = $(document).height() - 80;
	if($(document).width() > 600){
		$(".panel").height(docHeight);
	}
	
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


