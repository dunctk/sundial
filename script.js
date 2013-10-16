DIAL_CENTER = [300,300];
DIAL_RADIUS = 200;

function getSunset() {
	
};

function getSunPosition() {
	var time = new Date();
	var angle = (time.getHours() * 15) + 270;
	x = DIAL_CENTER[0] + DIAL_RADIUS * Math.cos(angle * (Math.PI / 180));
	y = DIAL_CENTER[1] + DIAL_RADIUS * Math.sin(angle * (Math.PI / 180));
	return [x,y];
};

//Setup canvas
var primary_canvas = document.getElementById("primary");
var context = primary_canvas.getContext("2d");

function drawDial() {
	//Draw the daytime part of the dial
	context.beginPath();
	context.arc(DIAL_CENTER[0], DIAL_CENTER[1], DIAL_RADIUS, 1, 1.9*Math.PI);
	//context.closePath();
	context.lineWidth = 2;
	context.strokeStyle = "#f0e6a3";
	context.stroke();

	//Draw the nightime part of the dial
	context.beginPath();
	context.arc(DIAL_CENTER[0], DIAL_CENTER[1], DIAL_RADIUS, 0.6, 0.8*Math.PI);
	context.lineWidth = 3;
	context.strokeStyle = "blue";
	context.stroke();
};

function drawSun() {
	var sun_position = getSunPosition();
	context.beginPath();
	context.arc(sun_position[0], sun_position[1], 30, 0, 2*Math.PI);
	context.closePath();
	context.fillStyle = "#f0e6a3";
	context.fill();
	//t = setTimeout(function(){drawSun()}, 100);
};

//Draw text
var time = new Date();
var h = time.getHours();
var m = time.getMinutes();
context.font = "20px Helvetica Neue";
context.fillStyle = "#fff";

