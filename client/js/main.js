var timer;

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

/* FUNCTION TO SET INSTAGRAM IMAGE WITH RIGHT WIDTH AND HEIGHT*/
function setImageAtStart(){
	$(".instgrm").each(function(){
		var widthImg = $(this).width();
		$(this).height(widthImg);
		$(this).find(".img").css({"width":widthImg, "height":widthImg});
	});
}

function timer(){
	var offset = $(".active").position().left;
	var widthBar = $(".active").width();
	$(".timerBarYellow").css("left",offset);
	$(".timerBarYellow").animate({"width":widthBar}, 20000);
};


