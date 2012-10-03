var timer;
var yellowBar = $(".timerBarYellow");
var counterBar = 0;

$(document).ready(function() {
  setImageAtStart();
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

window.onresize(function(){
	setImageAtStart();
});

/* FUNCTION TO SET INSTAGRAM IMAGE WITH RIGHT WIDTH AND HEIGHT*/
function setImageAtStart(){
	$(".instgrm").each(function(){
		var widthImg = $(this).width();
		$(this).height(widthImg);
		$(this).find(".img").css({"width":widthImg, "height":widthImg});
	});
}

function timer(){
	yellowBar.width(0);
	var offset = $(".active").position().left;
	var widthBar = $(".active").width();
	yellowBar.css("left",offset);
	yellowBar.animate({"width":widthBar}, 20000, function(){
		var old_active = $(".active");
		if(counterBar % 3 !== 0){
			$(".active").next().addClass('active');
		}
		else{
			$("#social").addClass('active');
		}
		old_active.removeClass('active');
		timer();
		});
	counterBar++;
};


