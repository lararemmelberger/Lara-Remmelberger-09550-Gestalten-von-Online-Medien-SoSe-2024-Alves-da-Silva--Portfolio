const canvas = document.getElementById("fractalTreeCanvas");
const context = canvas.getContext("2d");

// Recursive function to draw the fractal tree
function drawTree(x, y, angle, length, depth) {
  if (depth === 0) {
    return;
  }

  // Calculate the new end point of the branch
  const radianAngle = (angle * Math.PI) / 180;
  const xEnd = x + length * Math.cos(radianAngle);
  const yEnd = y + length * Math.sin(radianAngle);

  // Draw the branch
  context.strokeStyle = `rgb(255, ${255 - depth * 10}, ${255 - depth * 15})`; // Color varies with depth
  context.lineWidth = depth; // Thickness decreases with depth
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(xEnd, yEnd);
  context.stroke();

  // Recursively draw the left and right branches
  const newLength = length * 0.9; // Length of branches decrease
  drawTree(xEnd, yEnd, angle - 30, newLength, depth - 1); // Left branch
  drawTree(xEnd, yEnd, angle + 30, newLength, depth - 1); // Right branch
}

function draw() {
  // clear all the content
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Set the starting point and initial angle for the tree
  const startX = canvas.width / 2;
  const startY = canvas.height;
  const startAngle = -90; // Pointing upwards
  const startLength = 100; // Initial branch length
  const depth = parseInt(document.getElementById("depth").value);

  drawTree(startX, startY, startAngle, startLength, depth);
}