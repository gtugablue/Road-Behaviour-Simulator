var canvas;

$( document ).ready(function() {
  var nQuestions = $('#questions > div').length;
	var latitude = 41.177209, longitude = -8.596665;

	canvas = new fabric.Canvas('c');
	canvas.setWidth(800);
	canvas.setHeight(600);

	// Background
	changeScenery(latitude, longitude, 90, 200, -5);

	// Change coordinates
	$('#changeLocation').click(function (e) {

		latitude = parseFloat($('#latitude').val());
		longitude = parseFloat($('#longitude').val());

    changeSceneryPickerLocation(latitude, longitude);
	});

	$('#addQuest').click(function () {

		$('#questions').append(
			'<div >' +
				'<label>Question ' + (nQuestions + 1 )+'</label> ' +
				'<input name="question" type="text">' +
			'</div>'
		)
		nQuestions++;

	})

	initialize();
});

window.changeSceneryPickerLocation = function (latitude, longitude) {
  var location = {lat: latitude, lng: longitude};
  console.log(location);
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('sceneryPickerCanvas'), {
      position: location,
      pov: {
        heading: 34,
        pitch: 10
      }
    });
};

window.changeScenery = function (latitude, longitude, fov, heading, pitch) {
	// Background
	fabric.Image.fromURL('https://maps.googleapis.com/maps/api/streetview?size=800x600&location=' +
		latitude +
		',' + longitude +
		'&fov=' + fov +
		'&heading=' + heading +
		'&pitch=' + pitch +
		'&key=AIzaSyB_DzzYoHNMdyJYe53zW5j81EqRwv7r3RY', function(image) {
		image.set({
			width:800,
			height:600,
		});

		canvas.setBackgroundImage(image);
		canvas.renderAll();
	});
}
window.addSign = function(type) {

	fabric.Image.fromURL('images/signs/' + type + '.png', function(image) {
		image.scaleToWidth(50);
		canvas.add(image);
	});
}

window.deleteObject = function() {
	if(canvas.getActiveGroup()){
		canvas.getActiveGroup().forEachObject(function(o){
			canvas.remove(o)
		});
		canvas.discardActiveGroup().renderAll();
	} else {
		canvas.remove(canvas.getActiveObject());
	}
}

function initialize() {
  var fenway = {lat: 42.345573, lng: -71.098326};
  var map = new google.maps.Map(document.getElementById('c'), {
    center: fenway,
    zoom: 14
  });
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('sceneryPickerCanvas'), {
      position: fenway,
      pov: {
        heading: 34,
        pitch: 10
      }
    });
  //map.setStreetView(panorama);

  $("#sceneryPickerModal").on("shown.bs.modal", function () {
    google.maps.event.trigger(map, "resize");
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('sceneryPickerCanvas'), {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
    map.setStreetView(panorama);
  });

  /*panorama.addListener('pov_changed', function() {
  	var pos = panorama.getPosition();
  	var pov = panorama.getPov();
    changeScenery(pos.lat(), pos.lng(), 90, pov.heading, pov.pitch);
  });*/
}