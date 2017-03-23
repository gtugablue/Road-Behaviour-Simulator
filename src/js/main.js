$( document ).ready(function() {
	// create a wrapper around native canvas element (with id="c")
	var canvas = new fabric.Canvas('c');
	canvas.setBackgroundImage('https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=AIzaSyB_DzzYoHNMdyJYe53zW5j81EqRwv7r3RY');
	canvas.setHeight(400);
	canvas.setWidth(400);
	
	// create a rectangle object
	var rect = new fabric.Rect({
	  left: 100,
	  top: 100,
	  fill: 'red',
	  width: 20,
	  height: 20
	});

	// "add" rectangle onto canvas
	canvas.add(rect);
});