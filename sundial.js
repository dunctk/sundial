/*! SundialJS v1.0.0 2013-11-01 by Duncan Trevithick @dunctk - MIT License */


// get today's sunlight times for London

var times = SunCalc.getTimes(new Date(), 51.5, -0.1);

// format sunrise time from the Date object

var sunriseStr = moment(times.sunrise).format('HH:mm');
var sunsetStr = moment(times.sunset).format('HH:mm');

//Get the user's longitude

navigator.geolocation.getCurrentPosition(GetLongitude);
function GetLongitude(location) {
    return(location.coords.latitude);
}

function IsNightTime(){
	var current_time = new Date();
	if ((current_time > times.sunset) || (current_time < times.sunrise))  {
		return true;
	} else {
		return false;
	};
};


//Set the stage

var stage = new Kinetic.Stage({
	container: 'container',
	width: 600,
	height: 600
});


function getDialAngle(time) {
	var angle = (((time.getHours() * 60) + time.getMinutes()) * 0.25 ) + 90;
	return angle;
};	

var current_time = new Date();

// Seperate layer for dial elements

var dialLayer = new Kinetic.Layer();


// 'Sunny' part of the dial

var dialDaytime = new Kinetic.Shape ({
	x: stage.getWidth() / 2,
	y: stage.getHeight() / 2,
	stroke: '#f0e6a3',
	strokeWidth: 3,
	drawFunc: function(context) {
		var riseTime = times.sunrise;
		var setTime = times.sunset;
		var riseAngle = (getDialAngle(riseTime) * (Math.PI / 180));
		var setAngle = (getDialAngle(setTime) * (Math.PI / 180));
		context.beginPath();
		context.arc(0, 0, 250, riseAngle, setAngle);
		context.fillStrokeShape(this);
	}
});
//dialDaytime.rotate(Math.PI * 0.5);

// The 'night' part of the dial

var dialBase = new Kinetic.Circle({
	x: stage.getWidth() / 2,
	y: stage.getHeight() / 2,
	radius: 250,
	stroke: '#969696',
	strokeWidth: 1
});

var dialTimeText = new Kinetic.Text({
	x: dialBase.getX() - 110,
	y: dialBase.getY() - 50,
    fontSize: 45,
    width: 220,
    fontFamily: 'Exo, sans-serif',
    fill: '#969696',
    align: 'center'
});
var dialSunriseTimeText = new Kinetic.Text({
	x: dialBase.getX() - 350,
	y: dialBase.getY() + 160,
    fontSize: 18,
    width: 200,
    fontFamily: 'Exo, sans-serif',
    fill: '#969696',
    align: 'center',
    text: sunriseStr
});
var dialSunsetTimeText = new Kinetic.Text({
	x: dialBase.getX() + 150,
	y: dialBase.getY() + 160,
    fontSize: 18,
    width: 200,
    fontFamily: 'Exo, sans-serif',
    fill: '#969696',
    align: 'center',
    text: sunsetStr
});
var dialDateText = new Kinetic.Text({
	x: dialBase.getX() - 100,
	y: dialBase.getY(),
    fontSize: 18,
    width: 200,
    fontFamily: 'Exo, sans-serif',
    fill: '#969696',
    align: 'center',
    text: (moment().format('MMMM Do YYYY'))
});
var dialLocationText = new Kinetic.Text({
	x: dialBase.getX() - 100,
	y: dialBase.getY() + 30,
    fontSize: 18,
    width: 200,
    fontFamily: 'Exo, sans-serif',
    fill: '#969696',
    align: 'center',
    text: 'London, UK'
});
	
function getX(time) {
	var angle = getDialAngle(time);
	var x = dialBase.getX() + dialBase.getRadius()  * Math.cos(angle * (Math.PI / 180));
	return(x);
};
function getY(time){
	var angle = getDialAngle(time);
	var y = dialBase.getY() + dialBase.getRadius()  * Math.sin(angle * (Math.PI / 180));
	return y;
};

var celestial_layer = new Kinetic.Layer();
var sun = new Kinetic.Circle({
	x: getX(current_time),
	y: getY(current_time),
	radius: 30,
	fill: '#f0e6a3',
	draggable: false
});

var moon_centre_elipse = new Kinetic.Ellipse({
	x: getX(current_time),
	y: getY(current_time),
	radius: {
		x: 15,
		y: 30
	}

});
var moon_full = new Kinetic.Circle({
	x: getX(current_time),
	y: getY(current_time),
	radius: 30
});
var moon_half_left = new Kinetic.Circle({
	x: getX(current_time),
	y: getY(current_time),
	radius: 30,
	drawFunc: function(context) {
		context.beginPath();
		context.arc(0, 0, 30, 0.5*Math.PI, 1.5*Math.PI);
		context.fillStrokeShape(this);
	}
});
var moon_half_right = new Kinetic.Circle({
	x: getX(current_time),
	y: getY(current_time),
	radius: 30,
	drawFunc: function(context) {
		context.beginPath();
		context.arc(0, 0, 30, 1.5*Math.PI, 0.5*Math.PI);
		context.fillStrokeShape(this);
	}
});

// Asign the dial elemnts to layers and draw them

dialLayer.add(dialDaytime);
dialLayer.add(dialDateText);
dialLayer.add(dialLocationText);
dialLayer.add(dialTimeText);
dialLayer.add(dialSunriseTimeText);
dialLayer.add(dialSunsetTimeText);
dialLayer.add(dialBase);	
stage.add(dialLayer);

function SetMoonPhase(date){
	//var phase = SunCalc.getMoonFraction(date);
	var phase = 0.875;
	switch(phase) {
		case 0:
			moon_full.setFill('#000');
			break;

		case 0.125:
			moon_centre_elipse.setFill('#000');
			moon_half_left.setFill('#000');
			moon_full.setFill('#DEDEDE');
			break;

		case 0.25:
			moon_half_right.setFill('#DEDEDE');
			moon_full.setFill('#000');
			break;

		case 0.375:
			moon_centre_elipse.setFill('#DEDEDE');
			moon_half_right.setFill('#DEDEDE');
			moon_full.setFill('#000');
			break;

		case 0.5:
			moon_full.setFill('#DEDEDE');
			break;

		case 0.625:
			moon_centre_elipse.setFill('#DEDEDE');
			moon_half_left.setFill('#DEDEDE');
			moon_full.setFill('#000');
			break;

		case 0.75:
			moon_half_left.setFill('#DEDEDE');
			moon_full.setFill('#000');
			break;

		case 0.875:
			moon_centre_elipse.setFill('#000');
			moon_half_right.setFill('#000');
			moon_full.setFill('#DEDEDE');
			break;

		case 1:
			moon_full.setFill('#000');
			break;
	};
};

//Decide whether to show the moon or sun

if (IsNightTime()) {
	celestial_layer.add(moon_full);
	celestial_layer.add(moon_half_left);
	celestial_layer.add(moon_half_right);
	celestial_layer.add(moon_centre_elipse);
	SetMoonPhase(current_time);
} else {
	celestial_layer.add(sun);
}

stage.add(celestial_layer);
onUpdateTimeText();


//Set time to keep the dial time updated

setInterval(function() {onUpdateTimeText() }, 1000);
function onUpdateTimeText() {
	var current_time = new Date();
	dialTimeText.setText(moment().format('HH:mm:ss'));
	dialLayer.draw();
}

setInterval(function() {onUpdateCelestialPosition() }, 30000);
function onUpdateCelestialPosition() {
	var current_time = new Date();
	/*if (IsNightTime()){
		moon_face.setX(getX(current_time));
		moon_face.setY(getY(current_time));
		moon_shadow.setX(getX(current_time));
		moon_shadow.setY(getY(current_time));
	} else {
		sun.setX(getX(current_time));
		sun.setY(getY(current_time));
	}*/
	celestial_layer.draw();
}

