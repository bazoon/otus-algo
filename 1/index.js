const width = 1200;
const height = 1200;
const pixelSize = 10;

const context = document.getElementById('canvas').getContext('2d');
var image = context.createImageData(1, 1); // pixel image
var data = image.data;

// function drawPixel(x, y, color) {
//   data[0] = color.r;
//   data[1] = color.g;
//   data[2] = color.b;
//   data[3] = color.a;
//   context.putImageData(image, x, y);
// }

function drawPixel(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, pixelSize, pixelSize);
}


for (var x = 0; x < width; x += pixelSize) {
  for (var y = 0; y < width; y += pixelSize) {
    drawPixel(x, y, x % 20 == 0 && y % 20 == 0 ? "green" : "white");
  }
}




// to increase performance createImageData method 
// should be executed once e.g. before drawing
// var image = context.createImageData(1, 1); // pixel image
// var data = image.data;

// function drawPixel(x, y, color) {
//   data[0] = color.r;
//   data[1] = color.g;
//   data[2] = color.b;
//   data[3] = color.a;

//   context.putImageData(image, x, y);
// }

// var colors = [
//   {r: 255, g: 0, b: 0, a: 255}, // red
//   {r: 0, g: 255, b: 0, a: 255}, // green
//   {r: 0, g: 0, b: 255, a: 255}, // blue
// ];

// var t1 = new Date();

// for (var i = 0; i < 10000; ++i) {
//   var x = canvas.width * Math.random();
//   var y = canvas.height * Math.random();
//   var color = colors[i % colors.length];

//   drawPixel(x, y, color);
// }


// var t2 = new Date();
// var dt = t2 - t1;

// console.log('elapsed time = ' + dt + ' ms');
