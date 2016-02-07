

var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext('2d');
var offsetX = 0;
var offsetY = 0;
var count = 0;

function drawContext2() {
  canvas2.width = canvas2.width;
  context2.arc(centerX + offsetX, centerY + offsetY, radius, 0, 2 * Math.PI, false);
  context2.fillStyle = 'red';
  context2.fill();
  context2.lineWidth = 2;
  context2.strokeStyle = 'black';
  context2.stroke();
}

function updateOffsets() {
  if (offsetY === 0 && 0 <= offsetX && offsetX < 100) {
    offsetX++;
    offsetX++;
  } else if (offsetX === 100 && 0 <= offsetY && offsetY < 100) {
    offsetY++;
    offsetY++;
  } else if (offsetY === 100 && 0 < offsetX && offsetX <= 100) {
    offsetX--;
    offsetX--;
  } else if (offsetX === 0   && 0 < offsetY && offsetY <= 100) {
    offsetY--;
    offsetY--;
  }
}

function animateContext2() {

  updateOffsets();
  drawContext2();

  requestAnimationFrame(animateContext2);
}

// while (count < 400) {
//   requestAnimationFrame(animateContext2)
//   count++;
// }
animateContext2()

// drawContext2();
var context3 = document.getElementById('canvas3').getContext('2d');
