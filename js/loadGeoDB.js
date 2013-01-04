 // Cordova is ready
    //
var sql;
var params;
var currentlocation;
var direction;
function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError);
}

    // onSuccess Geolocation
    //
function onGeoSuccess(position) {
    currentlocation = [position.coords.latitude,position.coords.longitude,position.coords.accuracy , position.timestamp]
    $("#geoInfo").html('<strong>Current location</strong>' + '<br />' +'<strong>Latitude:</strong> '  + position.coords.latitude   + ' <strong>Longitude:</strong> '  + position.coords.longitude)
     var times = prayTimes.getTimes(new Date(), [position.coords.latitude,position.coords.longitude ]);
     $("#prayerTimeInfo").html('<strong>Prayer time for today</strong></br> <strong>Fajr :</strong> ' +times.fajr  + ' <strong>Dhuhr :</strong> '+ times.dhuhr +'  <strong>Asr :</strong> '+ times.asr +	' <strong>Maghrib  :</strong> '+ times.maghrib +' <strong>Isha :</strong> '+ times.isha +'</br><strong>Sunrise :</strong> '+ times.sunrise +'<strong>Sunset :</strong> '+ times.sunset) ;
    direction = qiblaDirection(position);
    if(direction >=0){
         $("#prayerDirection").html( "<strong>Qibla Direction </strong>" + direction + "degrees east of North");
    }else{ 
         $("#prayerDirection").html("<strong>Qibla Direction </strong>" +  (-direction) +" degrees west of North");
    } 

    var db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
      sql ="INSERT INTO CURRENTLOCATION(latitude, longitude, altitude, accuracy,altitudeAccuracy, heading, speed,timestamp) VALUES (?,?,?,?,?,?,?,?)";
      params = [position.coords.latitude, position.coords.longitude , position.coords.altitude , position.coords.accuracy , position.coords.altitudeAccuracy , position.coords.heading,  position.coords.speed , position.timestamp];
     db.transaction(populateDB, errorGeoCDB, successGeoCDB);

     console.log('Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp          + '<br />');
 
    }

    // onError Callback receives a PositionError object
    function onGeoError(error) {
        console.log('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

function populateDB(tx) {
   console.log(sql);
   console.log(params);
     tx.executeSql(sql, params);
 
}


function errorGeoCDB(err) {
    console.log("Error processing SQL: "+err.code);
}

function successGeoCDB() {
    console.log("Geo data added success!");
}

function qiblaDirection( position){

        var lat = position.coords.latitude;
        var lon= position.coords.longitude;
        var PI = Math.PI;

	if (isNaN(lat-0.0) || isNaN(lon-0.0)) {
		alert("Non-numeric entry/entries");
		return "???";
	}
	if ((lat-0.0)>(90.0-0.0) || (lat-0.0)<(-90.0-0.0)) {
		alert("Latitude must be between -90 and 90 degrees");
		return "???";
	}
	if ((lon-0.0)>(180.0-0.0) || (lon-0.0)<(-180.0-0.0)) {
		alert("Longitude must be between -180 and 180 degrees");
		return "???";
	}
	if (Math.abs(lat-21.4)<Math.abs(0.0-0.01) && Math.abs(lon-39.8)<Math.abs(0.0-0.01)) return "Any";	//Mecca
	phiK = 21.4*PI/180.0;
	lambdaK = 39.8*PI/180.0;
	phi = lat*PI/180.0;
	lambda = lon*PI/180.0;
	psi = 180.0/PI*Math.atan2(Math.sin(lambdaK-lambda),Math.cos(phi)*Math.tan(phiK)-Math.sin(phi)*Math.cos(lambdaK-lambda));
	return Math.round(psi);
}