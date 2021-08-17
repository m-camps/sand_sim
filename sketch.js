var canvasWidth = 800;
var canvasHeight = 800;
var dpi = 10;
var grid = 0;
var tmp = 0;
var Type = {
  sand: 'sand',
  water: 'water',
  rock: 'rock',
  void: 'void',
  current: 'sand', 
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  newArray();
}

function draw() {
  background(100);
  fill(150);
  rect(dpi, dpi, canvasWidth - (2*dpi), canvasHeight - (2*dpi));
  pos = createVector(pmouseX - pmouseX % dpi, pmouseY - pmouseY % dpi);
  click();
  revSim();
  drawSim();
  updateUI();
}


function click(){
  if (mouseIsPressed){
    if (mouseButton === LEFT && pos.x < canvasWidth - dpi && pos.y < canvasHeight - dpi && pos.x > 0 && pos.y > 0){
      grid[pos.x/dpi][pos.y/dpi] = Type.current;
    }
  }
}

function sim(){
  for (let i = 0; i < canvasWidth / dpi - 1; i++){
    for (let j = 0; j < canvasHeight / dpi - 2; j++){
      if (grid[i][j] == Type.sand){sand(i, j)}
		  if (grid[i][j] == Type.rock){rock(i, j)}
      if (grid[i][j] == Type.water){water(i, j)}
    }
  }
}

function revSim(){
  for (let i = canvasWidth / dpi - 2; i > 0; i--){
    for (let j = canvasHeight / dpi - 3; j > 0; j--){
      if (grid[i][j] == Type.sand){sand(i, j)}
		  if (grid[i][j] == Type.rock){rock(i, j)}
      if (grid[i][j] == Type.water){water(i, j)}
    }
  }
}

// function copyArray(src){
//   dest = new Array(canvasWidth / dpi);
//   for (let i = 0; i < canvasWidth / dpi; i++)
//     dest[i] = src[i].slice();
//   return dest;
// }

function rock(i, j){
  return  ;
}

function sand(i, j){
  if (grid[i][j+1] == Type.void){swapParticle(i, j, 0, 1, Type.sand, Type.void)}
  else if (grid[i][j+1] == Type.water){swapParticle(i, j, 0, 1, Type.sand, Type.water)}
  else if (grid[i-1][j+1] == Type.void && i != 1){swapParticle(i, j, -1, 1, Type.sand, Type.void)}
  else if (grid[i+1][j+1] == Type.void && i != canvasWidth / dpi - 2){swapParticle(i, j, 1, 1, Type.sand, Type.void)}
}

function water(i, j){
  if (grid[i][j+1] == Type.void){swapParticle(i, j, 0, 1, Type.water, Type.void)}
  else if (grid[i+1][j] == Type.void && i != canvasWidth / dpi - 2){swapParticle(i, j, 1, 0, Type.water, Type.void)}
  else if (grid[i-1][j] == Type.void && i != 1){swapParticle(i, j, -1, 0, Type.water, Type.void)}
}

function swapParticle(i, j, offsetX, offsetY, element, swap){
  grid[i+offsetX][j+offsetY] = element;
  grid[i][j] = swap;
}

function drawSim(){
	for (let i = 0; i < canvasWidth / dpi; i++){
		for (let j = 0; j < canvasHeight / dpi; j++){
			if (grid[i][j] == Type.sand){fill(255, 196, 0)}
      if (grid[i][j] == Type.rock){fill('grey')}
      if (grid[i][j] == Type.water){fill(212, 241, 249)}
    	if (grid[i][j] != Type.void){rect(i * dpi, j * dpi, dpi, dpi);}
    }
  }
}

function newArray(){
  grid = new Array(canvasWidth / dpi);
  for ( i = 0; i < canvasWidth / dpi; i++)
    grid[i] = new Array(canvasHeight / dpi).fill(Type.void);
}

function updateUI(){
  selColor = document.getElementById("brushColor").value;
  brushSize = document.getElementById("brushSlider").value;
  Type.current = document.getElementById("element").value;
  document.getElementById("framerate").innerHTML = round(frameRate());
  document.getElementById("xpos").innerHTML = round(pos.x / dpi);
  document.getElementById("ypos").innerHTML = round(pos.y / dpi);
  document.getElementById("type").innerHTML = Type.current;
}

function clearGrid(){
  grid = newArray();
}

function  printButton(){
  // console.log(Type.current);
  // console.log(Type.rock)
  // console.log(Type.current == Type.rock)
  console.log(grid);
}