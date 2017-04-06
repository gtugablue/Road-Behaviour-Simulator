var canvas;
$( document ).ready(function() {
	var nQuestions = $('#questions > div').length;
	var latitude = 41.177209, longitude = -8.596665;

	canvas = new fabric.Canvas('c');
	canvas.setWidth(800);
	canvas.setHeight(600);

	// Background
	changeStreetViewCoords(latitude, longitude);

	// Change coordinates
	$('#changeLocation').click(function (e) {

		latitude = $('#latitude').val();
		longitude = $('#longitude').val();

		changeStreetViewCoords(latitude,longitude);
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
});

window.changeStreetViewCoords = function (latitude, longitude) {
	// Background
	fabric.Image.fromURL('https://maps.googleapis.com/maps/api/streetview?size=800x600&location=' + latitude + ',' + longitude + '&fov=90&heading=20&pitch=-5&key=AIzaSyB_DzzYoHNMdyJYe53zW5j81EqRwv7r3RY', function(image) {
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