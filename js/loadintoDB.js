var serviceURL = "http://www.shafi.com.au/directory/app-data/wp_postmeta_extended.json";
var employees;

// Wait for Cordova to load
//document.addEventListener("deviceready", onDeviceReady, false);

$('#loadDataDB').bind('pageinit', function(event) {
	onDeviceReady();
});

function loadDataDBList() {
	$.getJSON(serviceURL, function(data) {
		$('#employeeList li').remove();
                for (var x = 0; x < data.length; x++) {
                	 $('#employeeList').append("<li><a href='employeedetails.html?id="+data[x].ID+"' class='ui-link-inherit' data-rel='dialog' data-transition='pop'><h3 class='ui-li-heading'>" +data[x].post_title+ "</h3><p class='ui-li-desc'>" + data[x].Location +"</p><span class='ui-li-count ui-btn-up-c ui-btn-corner-all'>"+data[x].ID+" km</span></a></li>");
                }

        try {
                   $('#employeeList').listview('refresh');
                } catch(e) {
                    $('#employeeList').trigger("create");
                }
         });
	}
	
	// Populate the database 
    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Query the database
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
    }

    // Query the success callback
    function querySuccess(tx, results) {
        var len = results.rows.length;
        console.log("DEMO table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
        }
    }

    // Transaction error callback
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    function successCB() {
        alert('successCB');
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(queryDB, errorCB);
    }

    // Cordova is ready
    function onDeviceReady() {
        alert('onDeviceReady');
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }
