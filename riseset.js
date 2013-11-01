/* Calculate the sunset time for a given date and location. 
   Based on this: http://en.wikipedia.org/wiki/Sunrise_equation */

function getSunsetTime(date){
	Date.prototype.getJulian = function(){
		return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
	}
	var julian_date = date.getJulian();
	var longitude_west = 0;
	var julian_cycle = 
	var solar_noon = 2451545.0009 + (longitude_west / 360) + julian_cycle;
	var hour_angle = 
	var solar_mean_anomaly = (357.5291 + 0.98560028 * (solar_noon - 2451545)) % 360;
	var equation_of_center = 1.9148 * Math.sin(solar_mean_anomaly) + 0.0200 * Math.sin(2 * solar_mean_anomaly) + 0.0003 * Math.sin(3 * solar_mean_anomaly);
	var eclipitc_longitude = (solar_mean_anomaly + 102.9372 + equation_of_center + 180) % 360;

	var sunset = 2451545.0009 + ((hour_angle + longitude_west) / 360) + julian_cycle + (0.0053 * Math.sin(solar_mean_anomaly)) - 0.0069 * Math.sin(2 * eclipitc_longitude);

	return sunset;
};

var today = new Date();
var sunset_time = getSunsetTime(today);
console.log(sunset_time);