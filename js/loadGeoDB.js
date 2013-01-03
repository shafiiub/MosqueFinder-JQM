 // Cordova is ready
    //
var sql;
var params;
var currentlocation;
function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError);
}

    // onSuccess Geolocation
    //
function onGeoSuccess(position) {
    currentlocation = [position.coords.latitude,position.coords.longitude,position.coords.accuracy , position.timestamp]
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
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

function populateDB(tx) {
     tx.executeSql('DROP TABLE IF EXISTS CURRENTLOCATION');
     tx.executeSql('CREATE TABLE IF NOT EXISTS CURRENTLOCATION(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, latitude VARCHAR(50), longitude VARCHAR(50), altitude VARCHAR(50), accuracy VARCHAR(50),altitudeAccuracy VARCHAR(50), heading VARCHAR(50), speed VARCHAR(50),timestamp VARCHAR(50))');
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