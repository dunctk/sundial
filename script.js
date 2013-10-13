function getSunset() {
	
};

function getSunPosition() {
	center_x = 300;
	center_y = 300;
	radius = 200;
	angle = 0;
	x = center_x + radius * Math.cos(angle * (Math.PI / 180));
	y = center_y + radius * Math.sin(angle * (Math.PI / 180));
	return [x,y];
};

//Setup canvas
var primary_canvas = document.getElementById("primary");
var context = primary_canvas.getContext("2d");

//Draw outer circle
context.beginPath();
context.arc(300, 300, 200, 0, 2*Math.PI);
context.closePath();
context.lineWidth = 2;
context.strokeStyle = "#f0e6a3";
context.stroke();

//Draw sun 
var sun_position = getSunPosition();
context.beginPath();
context.arc(sun_position[0], sun_position[1], 30, 0, 2*Math.PI);
context.closePath();
context.fillStyle = "#f0e6a3";
context.fill();