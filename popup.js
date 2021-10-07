
// Store images so we can remove them after they hit an upper limit
let images = [];

// Store mouse position
let mousePos = { x: -1000, y: -1000};

let lastX = -1000;
let lastY = -1000;

function spawnimage(x, y) {
  if (lastX === x && lastY === y) {
    return
  }

  lastX = x;
  lastY = y;

  var image = document.createElement('img');
  image.setAttribute('src', './square.jpg');
  image.setAttribute('class', 'overlays');
  image.setAttribute('width', 128);
  image.setAttribute('height', 128);
  image.style.left = x - 64 + 'px';
  image.style.top = y - 64 + 'px';
  images.push(image);
  document.body.appendChild(image);
}


function repeater() {
  setTimeout(function () {
    spawnimage(mousePos.x, mousePos.y);
    repeater();
  }, 10);
}

document.addEventListener('mousemove', function(e) { 
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
});

function removeImage() {
  setTimeout(function() {
    if (images.length > 1) {
      images.shift().remove();
    }
    removeImage();
  }, 20);
}

document.addEventListener('DOMContentLoaded', function(event) { 
  spawnimage(mousePos.x, mousePos.y);
  repeater();
  removeImage();
});
