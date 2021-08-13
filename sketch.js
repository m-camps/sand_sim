var canvasWidth = 800;
var canvasHeight = 800;
var pxwidth = 2;
var Type = {
  sand: 'sand',
  water: 'water',
  rock: 'rock',
  void: 'void',
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  fill(255, 196, 0);
  grid = newArray();
}

function draw() {
  background(100);
  pos = createVector(pmouseX - pmouseX % pxwidth, pmouseY - pmouseY % pxwidth)
  click();
  drawSim();
  revSim();
  update();
}

function click(){
  if (mouseIsPressed){
    if (mouseButton === LEFT && pos.x < canvasWidth && pos.y < canvasHeight && pos.x >= 0 && pos.y >= 0){
      grid[pos.x / pxwidth][pos.y / pxwidth] = 'sand';
    }
  }
}

function sim(){
  for (let i = 0; i < canvasWidth / pxwidth; i++){
    for (let j = 0; j < canvasHeight / pxwidth; j++){
      if (grid[i][j] != Type.void){
        newSand(i, j);
      }
    }
  }
}

function revSim(){
  for (let i = canvasWidth / pxwidth - 1; i > 0; i--){
    for (let j = canvasHeight / pxwidth - 1; j > 0; j--){
      if (grid[i][j] != Type.void){
        newSand(i,j);
      }
    }
  }
}

function newSand(i, j){
  if (grid[i][j+1] == Type.void){swapParticle(i, j, 0, 1)}
  else if (grid[i][j+1] != Type.void && boundary(i, j, 0) == 1){
    if (grid[i-1][j+1] == Type.void){swapParticle(i, j, -1, 1)}
    else if (grid[i+1][j+1] == Type.void){swapParticle(i, j, 1, 1)}
  }
  else if (grid[i][j+1] == Type.sand && i == 0){swapParticle(i, j, 1, 1)}
  else if (grid[i][j+1] == Type.sand && i == canvasWidth / pxwidth - 1){swapParticle(i, j, -1, 1)}
}

function swapParticle(i, j, offsetX, offsetY){
  grid[i+offsetX][j+offsetY] = Type.sand;
  grid[i][j] = Type.void;
}

function boundary(i, j, z){
  if (j + z < canvasHeight / pxwidth - 1 && i + z < canvasWidth / pxwidth - 1 && j - z >= 0 && i - z  > 0)
    return 1;
  else
    return 0;
}

function drawSim(){
  for (let i = 0; i < canvasWidth / pxwidth; i++){
    for (let j = 0; j < canvasHeight / pxwidth; j++){
      if (grid[i][j] == 'sand'){
        rect(i * pxwidth, j * pxwidth, pxwidth, pxwidth);
      }
    }
  }
}

function newArray(){
  let grid = new Array(canvasWidth / pxwidth);
  for ( i = 0; i < canvasWidth / pxwidth; i++)
    grid[i] = new Array(canvasHeight / pxwidth).fill(Type.void);
  return grid;
}

function update(){
  selColor = document.getElementById("brushColor").value;
  brushSize = document.getElementById("brushSlider").value;
  document.getElementById("framerate").innerHTML = round(frameRate());
}

function clearGrid(){
  grid = newArray();
}

function  printButton(){
  console.log();
}