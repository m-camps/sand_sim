let pos = 0;
let gridWidth = 200;
let gridHeight = 200;
let pxSize = 4;
let bg = '#5a5f6b';
let env;
let element;
let brushSize = 3;
let ctx;

const type = {
  'sand': SandElement,
  'water': WaterElement,
  'steam': SteamElement,
  'rock': RockElement,
}

function setup() {
  env = new Environment(gridWidth, gridHeight);

  // Init p5.js canvas
  let p5canvas = createCanvas(gridWidth * pxSize, gridHeight * pxSize);

  // Use default js canvas instead of p5.js for faster performance
  let canvas = document.getElementById('defaultCanvas0');
  ctx = canvas.getContext('2d');

  //Link canvas to p5canvas
  p5canvas.parent('canvas-div');

  pos = createVector(pmouseX, pmouseY);
  console.log(env.grid);
  console.log(env.particleSet);
  background(bg);
}

function draw() {
  click();
  for (let p of env.particleSet){
    p.update();
    // p.checkStatic();
  }
  checkSelection();
}

function click(){
  if (mouseIsPressed){
    pos.set(floor(pmouseX / pxSize), floor(pmouseY / pxSize));
    if (mouseButton === LEFT && pos.x > 0 && pos.y > 0 && pos.x < gridWidth - 1){
      brush(pos.x, pos.y, env);
    }
  }
}

function  randomizeColorRGBtoHex(r,g,b,diff){
  r = floor(random() * (r - (r - diff)) + r - diff);
  g = floor(random() * (g - (g - diff)) + g - diff);
  b = floor(random() * (b - (b - diff)) + b - diff);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function  checkSelection(){
  element = document.getElementById("element").value;
  document.getElementById("framerate").innerHTML = floor(frameRate());
  document.getElementById("total").innerHTML = env.particleSet.size;
}

function brush(x, y, env){
  for (let i = x - brushSize; i <= x + brushSize; i++){
    for(let j = y - brushSize; j <= y + brushSize; j++){
      if (env.grid[i][j] == false){
        env.addParticle(new type[element](i, j, env));
      }
    }
  }
}
  // console.log(random() * (220 - 200) + 200)