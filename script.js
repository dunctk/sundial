var primary_canvas = document.getElementById("primary");
var context = primary_canvas.getContext("2d");

context.beginPath();
context.arc(95, 85, 40, 0, 2*Math.PI);
context.closePath();
context.lineWidth = 2;
context.strokeStyle = "#f0e6a3"
context.stroke();