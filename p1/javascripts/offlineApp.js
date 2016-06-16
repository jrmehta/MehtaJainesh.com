$(document).ready(function() {

	wordCounter();
	
	jQuery.validator.setDefaults({
	  ignore:[],
	  debug: true,
	  success: "valid"
	});
	
    $("#orderForm").validate({
		rules: {
                required: true,
        },
    })

    $('#btn').click(function() {
        if($("#orderForm").valid()){
			$('span.loading-image').show(); 
			setTimeout(function(){$('span.loading-image').hide();}, 1000);
			var formData = JSON.stringify($("form").serializeArray());
			saveDataLocal(formData);
		}
    });
});
var wordCounter = function(){
	$("#workDescription").on('keyup', function() {
			var words = this.value.match(/\S+/g).length;
			if (words > 300) {
				var trimmed = $(this).val().split(/\s+/, 300).join(" ");
				$(this).val(trimmed + " ");
			}
			else {
				$('#display_count').text(words);
			}
	});
}

var getGeoLocation = function() {
	
	var dots = window.setInterval( function() {
	  var loading = document.getElementById("loading");
	  if ( loading.innerHTML.length > 12 ) 
		loading.innerHTML = "Loading";
	  else 
		loading.innerHTML += ".";
	  }, 100);

	var locationInfo = function(position) {
		var curAltitude = 0;
		var curLatitude = position.coords.latitude;
		var curLongitude = position.coords.longitude;
		curAltitude = position.coords.altitude;
		if(curAltitude === null){
			curAltitude = 'N/A';
		}
		
		var setLongitude = function(longitude)	{
			document.getElementById('long').innerHTML = longitude;
			document.getElementById('longHidden').value = longitude;
		}
		
		var setLatitude = function(latitude)	{
			document.getElementById('lat').innerHTML = latitude;
			document.getElementById('latHidden').value = latitude;
		}
		
		var setAltitude = function(altitude)	{
			document.getElementById("altitude").innerHTML = altitude;
			document.getElementById("altHidden").value = altitude;
		}

		setLatitude(curLatitude);
		setLongitude(curLongitude);
		setAltitude(curAltitude);
		$("#orderForm").valid();
		clearInterval(dots);
		loading.innerHTML = "";
	}
  
  var locationInfoError = function(error) {
    var errorMessage = ['',
     'Permission denied',
     'Position unavailable',
     'timeout'];

	clearInterval(dots);
	loading.innerHTML = "error receiving location info: " + errorMessage[error.code];
  }
  
  navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError);
}

var fillDate = function(){
	var currDate = new Date().toJSON().slice(0,10)
	return currDate;
}

var saveDataLocal = function(data) {
  storeLocally(data);
  invokeIfConnected(sendToServer);
  setTimeout(function(){location.reload();}, 6000);
}

var storeLocally = function(data) {
  var issueCount = parseInt(localStorage.issueCount) + 1 || 0;
  
  localStorage[issueCount] = data;
  localStorage.issueCount = issueCount;
  setTimeout(function(){$('span.localStorageCheck').show();}, 1000);
  setTimeout(function(){$('span.localStorageCheck').hide();}, 2500);
  setTimeout(function(){$('span.serverOffline').show();}, 2700);  
}

var invokeIfConnected = function(callback) {
	var xhr = new XMLHttpRequest();
	var handler = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200){
				callback();
			}
		}
	}
	xhr.onreadystatechange = handler;
	xhr.open("GET", "/?q=" + Math.random());
	xhr.send();
}

var sendToServer = function() {
	var counter = parseInt(localStorage.issueCount);
	for(var i = 0; i<=counter; i++){
	$.ajax({
		url: '',
		type: 'POST',
		data: localStorage.getItem(i),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		async: false,
		success: function(msg) {
				}
	});
	}
	setTimeout(function(){$('span.serverOffline').hide();}, 2700); 	
	setTimeout(function(){$('span.serverOnline').show();}, 2800); 				
localStorage.clear();
}