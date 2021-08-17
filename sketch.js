var canvasWidth = 800;
var canvasHeight = 800;
var dpi = 5;
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
  rect(dpi, dpi, canvasWidth - (2*dpi), canvasHeight - (2*dpi));
  pos = createVector(pmouseX - pmouseX % dpi, pmouseY - pmouseY % dpi);
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
    if (mouseButton === LEFT && pos.x < canvasWidth - dpi&& pos.y < canvasHeight - dpi && pos.x > 0 && pos.y > 0){
      grid[pos.x / dpi][pos.y / dpi] = Type.current;
    }
  }
}

function sim(){
  for (let i = 0; i < canvasWidth / dpi; i++){
    for (let j = 0; j < canvasHeight / dpi; j++){
      if (grid[i][j] != Type.void){
		    sand(i, j);
      }
    }
  }
}

function revSim(){
  for (let i = canvasWidth / dpi - 2; i > 0; i--){
    for (let j = canvasHeight / dpi - 3; j > 0; j--){
      if (grid[i][j] != Type.void){
        if (grid[i][j] == Type.sand){sand(i, j);}
		    if (grid[i][j] == Type.rock){rock(i, j)};
      }
    }
  }
}

function rock(i, j){
	// swapParticle(i, j, 0, 0);
  return  ;
}

function sand(i, j){
  if (grid[i][j+1] == Type.void){swapParticle(i, j, 0, 1)}
  else if (grid[i][j+1] != Type.void && boundary(i, j) == 1){
    if (grid[i-1][j+1] == Type.void && i != 1){swapParticle(i, j, -1, 1)}
    else if (grid[i+1][j+1] == Type.void && i != canvasWidth / dpi - 2){swapParticle(i, j, 1, 1)}
  }
}

function swapParticle(i, j, offsetX, offsetY){
  grid[i+offsetX][j+offsetY] = Type.current; 
  grid[i][j] = Type.void;
}

function boundary(i, j){
  if (j < canvasHeight / dpi && i < canvasWidth / dpi && j >= 0 && i > 0)
    return 1;
  else
    return 0;
}

function drawSim(){
	for (let i = 0; i < canvasWidth / dpi; i++){
		for (let j = 0; j < canvasHeight / dpi; j++){
			if (grid[i][j] == 'sand'){fill(255, 196, 0)}
      if (grid[i][j] == 'rock'){fill('grey')}
    	if (grid[i][j] != Type.void){rect(i * dpi, j * dpi, dpi, dpi);}
    }
  }
}

function newArray(){
  var grid = new Array(canvasWidth / dpi);
  for ( i = 0; i < canvasWidth / dpi; i++)
    grid[i] = new Array(canvasHeight / dpi).fill(Type.void);
  return grid;
}

function update(){
  selColor = document.getElementById("brushColor").value;
  brushSize = document.getElementById("brushSlider").value;
  Type.current = document.getElementById("element").value;
  document.getElementById("framerate").innerHTML = round(frameRate());
  document.getElementById("xpos").innerHTML = round(pos.x / dpi);
  document.getElementById("ypos").innerHTML = round(pos.y / dpi);
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