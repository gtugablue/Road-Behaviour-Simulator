var canvas, panorama, signs;

var canvasWidth = 800;
var canvasHeight = 600;

$( document ).ready(function() {
  var nQuestions = $('#questions > div').length;
	var latitude = $('#lat').val()
  var longitude = $('#lon').val();
	var heading = $('#heading').val();
	var pitch = $('#pitch').val();
	var zoom = $('#zoom').val();

	if ($('#c').hasClass('static')) {
	  canvas = new fabric.StaticCanvas('c');
  } else {
    canvas = new fabric.Canvas('c');
  }
	canvas.setWidth(canvasWidth);
	canvas.setHeight(canvasHeight);

	// Background
	changeScenery(latitude, longitude, heading, pitch, zoom);
	deserializeCanvas($('input[name="signs"]').val());

  canvas.on('object:modified', function(e) {
    serializeCanvas();
  });

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
				'<input name="question" type="text" class="form-control">' +
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

  // Bind the event listeners for the image elements
  signs = document.querySelectorAll('#signs img');
  [].forEach.call(signs, function (img) {
    img.addEventListener('dragstart', handleDragStart, false);
    img.addEventListener('dragend', handleDragEnd, false);
  });
  // Bind the event listeners for the canvas
  var canvasContainer = document.getElementById('canvas-container');
  canvasContainer.addEventListener('dragenter', handleDragEnter, false);
  canvasContainer.addEventListener('dragover', handleDragOver, false);
  canvasContainer.addEventListener('dragleave', handleDragLeave, false);
  canvasContainer.addEventListener('drop', handleDrop, false);

  countdown($('.btn-break'));
});

function countdown(button) {
  setTimeout(function() {
    button.removeClass('btn-info');
    button.addClass('btn-default');
    button.html(3);
    setTimeout(function() {
      button.html(2);
      setTimeout(function() {
        button.html(1);
        setTimeout(function() {
          button.html('BRAKE');
          button.removeClass('btn-info');
          button.addClass('btn-danger');
          $('#canvas-container').removeClass('zero-brightness');
          var answerForm = $('#answerForm');
          answerForm.show(); // TODO show only after a decision is made
          answerForm.effect("highlight", {}, 3000);
          $('html, body').animate({ scrollTop: $(document).height()-$(window).height() }, 100);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 3000);
}

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
	// Background
  var url = 'https://maps.googleapis.com/maps/api/streetview?size=' + canvasWidth + 'x' + canvasHeight + '&location=' +
    latitude +
    ',' + longitude +
    '&fov=' + fov +
    '&heading=' + heading +
    '&pitch=' + pitch +
    '&key=AIzaSyB_DzzYoHNMdyJYe53zW5j81EqRwv7r3RY';
	fabric.Image.fromURL(url, function(image) {
		image.set({
			width:canvasWidth,
			height:canvasHeight,
		});

		canvas.setBackgroundImage(image);
		canvas.renderAll();
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
	serializeCanvas();
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

// -----------------------------------
// Drag and Drop into fabric.js canvas
// -----------------------------------

function handleDragStart(e) {
  [].forEach.call(signs, function (img) {
    img.classList.remove('img_dragging');
  });
  this.classList.add('img_dragging');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
  // NOTE: comment above refers to the article (see top) -natchiketa

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  var img = document.querySelector('#signs img.img_dragging');

  /*var newImage = new fabric.Image(img, {
    width: img.width,
    height: img.height,
    // Set the center of the new object based on the event coordinates relative
    // to the canvas container.
    left: e.layerX,
    top: e.layerY
  });*/
  var imageURL = '../images/signs/large/' + $('#signs img.img_dragging').attr('src').split('/').pop();
  fabric.Image.fromURL(imageURL, function(image) {
    image.scaleToHeight(100);
    image.setLeft(e.layerX + (canvasWidth / 2));
    image.setTop(e.layerY);
    canvas.add(image);
    canvas.setActiveObject(image);
    serializeCanvas();
  });
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  [].forEach.call(signs, function (img) {
    img.classList.remove('img_dragging');
  });
}

function serializeCanvas() {
  var json = JSON.stringify(canvas);
  $('#form input[name="signs"]').val(json);
  return json;
}

function deserializeCanvas(json) {
  canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
  });
  return canvas;
}