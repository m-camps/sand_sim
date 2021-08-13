var canvasWidth = 800;
var canvasHeight = 800;
var pxWidth = 10;
var Type = {
  sand: 'sand',
  water: 'water',
  rock: 'rock',
  void: 'void',
  current: 'sand'
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  fill(255, 196, 0); // color = orange
  grid = newArray();
}

function draw() {
  background(100);
  fill(150);
  rect(pxWidth, pxWidth, canvasWidth - (2*pxWidth), canvasHeight - (2*pxWidth));
  pos = createVector(pmouseX - pmouseX % pxWidth, pmouseY - pmouseY % pxWidth);
  if (pos.x < 0)
	pos.x = 0;
  click();
  fill(255, 196, 0);
  drawSim();
  revSim();
  update();
}

function click(){
  if (mouseIsPressed){
    if (mouseButton === LEFT && pos.x < canvasWidth - pxWidth&& pos.y < canvasHeight - pxWidth && pos.x > 0 && pos.y > 0){
      grid[pos.x / pxWidth][pos.y / pxWidth] = Type.current;
    }
  }
}

function sim(){
  for (let i = 0; i < canvasWidth / pxWidth; i++){
    for (let j = 0; j < canvasHeight / pxWidth; j++){
      if (grid[i][j] != Type.void){
		if (Type.current == Type.sand){sand(i, j);}
      }
    }
  }
}

function revSim(){
  for (let i = canvasWidth / pxWidth - 2; i > 0; i--){
    for (let j = canvasHeight / pxWidth - 2; j > 0; j--){
      if (grid[i][j] != Type.void){
        if (Type.current == Type.sand){sand(i, j);}
		if (Type.current == Type.rock){rock(i, j)};
      }
    }
  }
}
function rock(i, j){
	swapParticle(i, j, 0, 0);
}
function sand(i, j){
  if (grid[i][j+1] == Type.void){swapParticle(i, j, 0, 1)}
  else if (grid[i][j+1] != Type.void && boundary(i, j, 0) == 1){
    if (grid[i-1][j+1] == Type.void && i != 1){swapParticle(i, j, -1, 1)}
    else if (grid[i+1][j+1] == Type.void && i !=  - 4){swapParticle(i, j, 1, 1)}
  }
  else if (grid[i][j+1] == Type.sand && i == 0){swapParticle(i, j, 1, 0)}
  else if (grid[i][j+1] == Type.sand && i == canvasWidth / pxWidth - 1){swapParticle(i, j, -1, 1)}
}

function swapParticle(i, j, offsetX, offsetY){
  grid[i+offsetX][j+offsetY] = Type.current;
  grid[i][j] = Type.void;
}

function boundary(i, j, z){
  if (j + z < canvasHeight / pxWidth && i + z < canvasWidth / pxWidth && j - z >= 0 && i - z  > 0)
    return 1;
  else
    return 0;
}

function drawSim(){
	for (let i = 0; i < canvasWidth / pxWidth; i++){
		for (let j = 0; j < canvasHeight / pxWidth; j++){
			if (grid[i][j] == 'sand'){fill(255, 196, 0)}
    		if (grid[i][j] != Type.void){rect(i * pxWidth, j * pxWidth, pxWidth, pxWidth);}
    }
  }
}

function newArray(){
  var grid = new Array(canvasWidth / pxWidth);
  for ( i = 0; i < canvasWidth / pxWidth; i++)
    grid[i] = new Array(canvasHeight / pxWidth).fill(Type.void);
  return grid;
}

function update(){
  selColor = document.getElementById("brushColor").value;
  brushSize = document.getElementById("brushSlider").value;
  Type.current = document.getElementById("element").value;
  document.getElementById("framerate").innerHTML = round(frameRate());
  document.getElementById("xpos").innerHTML = round(pos.x / pxWidth);
  document.getElementById("ypos").innerHTML = round(pos.y / pxWidth);
}

function clearGrid(){
  grid = newArray();
}

function  printButton(){
  console.log(Type.current);
}