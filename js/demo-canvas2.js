var canvas  = document.getElementById('canvas2');
var context = canvas.getContext('2d');

var centerX = 50;
var centerY = 50;
var radius  = 40;

var offsetX = 0;
var offsetY = 0;

function draw() {
  // clear canvas
  canvas.width = canvas.width;
  // draw
  context.arc(centerX + offsetX, centerY + offsetY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'red';
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.stroke();
}

function updateOffsets() {
  if (offsetY === 0 && 0 <= offsetX && offsetX < 100) {
    offsetX+=2;
  } else if (offsetX === 100 && 0 <= offsetY && offsetY < 100) {
    offsetY+=2;
  } else if (offsetY === 100 && 0 < offsetX && offsetX <= 100) {
    offsetX-=2;
  } else if (offsetX === 0   && 0 < offsetY && offsetY <= 100) {
    offsetY-=2;
  }
}

function animate() {

  updateOffsets();
  draw();

  requestAnimationFrame(animate);
}

animate();
