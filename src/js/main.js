$( document ).ready(function() {
	// create a wrapper around native canvas element (with id="c")
	var canvas = new fabric.Canvas('c');
	canvas.setWidth(800);
	canvas.setHeight(600);
		
	fabric.Image.fromURL('https://maps.googleapis.com/maps/api/streetview?size=800x600&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=AIzaSyB_DzzYoHNMdyJYe53zW5j81EqRwv7r3RY', function(image) {
        image.set({
            // I need this because the image size and the canvas size could be different
            // in this way the image always covers the canvas
            width:800,
            height:600,
        });

       	canvas.setBackgroundImage(image);
        canvas.renderAll();
    });
	
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