var context = document.getElementById('canvas1').getContext('2d');

var centerX = 50;
var centerY = 50;
var radius = 40;

function draw() {
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'red';
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.stroke();
}

draw();
