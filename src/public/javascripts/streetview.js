var canvas, panorama;

$( document ).ready(function() {
  var nQuestions = $('#questions > div').length;
	var latitude = 41.177209, longitude = -8.596665;

	canvas = new fabric.Canvas('c');
	canvas.setWidth(800);
	canvas.setHeight(600);

	// Background
	changeScenery(latitude, longitude, 200, -5, 1);

	// Change coordinates
	$('#updateLocation').click(function (e) {

		latitude = parseFloat($('#latitude').val());
		longitude = parseFloat($('#longitude').val());

    changeSceneryPickerLocation(latitude, longitude);
	});

	$('#addQuest').click(function () {

		$('#questions').append(
			'<div class="form-group">' +
				'<label>Question ' + (nQuestions + 1 )+'</label> ' +
				'<input name="question[' + (nQuestions + 1) + ']" type="text" class="form-control">' +
			'</div>'
		)
		nQuestions++;

	})

	$('#saveScenery').click(function () {
		changeScenery(panorama.getPosition().lat(), panorama.getPosition().lng(), panorama.getPov().heading, panorama.getPov().pitch, panorama.getZoom());

		$('#lon').val(panorama.getPosition().lng());
		$('#lat').val(panorama.getPosition().lat());
		$('#heading').val(panorama.getPov().heading);
		$('#pitch').val(panorama.getPov().pitch);
		$('#zoom').val(panorama.getZoom());

		console.log($('#lon').val());
		console.log($('#lat').val());
		$('#sceneryPickerModal').modal('hide');
	});

	initialize();
});

window.changeSceneryPickerLocation = function (latitude, longitude) {
  var location = {lat: latitude, lng: longitude};
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('sceneryPickerCanvas'), {
      position: location,
      pov: {
        heading: 34,
        pitch: 10
      }
    });
};

window.changeScenery = function (latitude, longitude, heading, pitch, zoom) {
  var fov = 180 / Math.pow(2,zoom || 1);
  console.log(zoom, fov);
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
window.addSign = function(fileName) {

	fabric.Image.fromURL('../images/signs/large/' + fileName, function(image) {
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
  panorama = createDefaultPanorama();

  $("#sceneryPickerModal").on("shown.bs.modal", function () {
    google.maps.event.trigger(map, "resize");
    panorama = createDefaultPanorama();
  });
}

function createDefaultPanorama() {
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('sceneryPickerCanvas'), {
      position: {lat: 42.345573, lng: -71.098326},
      pov: {
        heading: 34,
        pitch: 10
      }
    });
  return panorama;
}