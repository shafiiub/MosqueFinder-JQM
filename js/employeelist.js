var serviceURL = "http://www.shafi.com.au/directory/app-data/wp_postmeta_extended.json";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
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