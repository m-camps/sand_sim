let pos = 0;
let pxSize = 4;
let gridWidth = 200;
let gridHeight = 200;
let bg = '#5a5f6b';
let env;
let element;
let brushSize = 10;
let ctx;

const type = {
  'sand': SandElement,
  'water': WaterElement,
  'steam': SteamElement,
  'stone': StoneElement,
  'void': VoidElement,
}

function setup() {
  // Init p5.js canvas
  let p5canvas = createCanvas(gridWidth * pxSize, gridHeight * pxSize);

  // Use default js canvas instead of p5.js for faster performance
  let canvas = document.getElementById('defaultCanvas0');
  ctx = canvas.getContext('2d');

  // Link canvas to p5canvas
  p5canvas.parent('canvas-div');

  background(bg);
  env = new Environment(gridWidth, gridHeight);
  pos = createVector(pmouseX, pmouseY);
  console.log(env.grid);
  console.log(env.particleSet);
}

function draw() {
  click();
  for (let p of env.particleSet){
    p.update();
  }
  for (let p of env.particleSet){
    p.paint();
  }
  checkSelection();
}

function click(){
  if (mouseIsPressed){
    pos.set(floor(pmouseX / pxSize), floor(pmouseY / pxSize));
    if (mouseButton === LEFT && pos.x > 0 && pos.y > 0 && pos.x < gridWidth - 1){
    	roundBrush(pos.x, pos.y, env);
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
  document.getElementById("posX").innerHTML = pos.x;
  document.getElementById("posY").innerHTML = pos.y;
}

function brush(x, y, env){
  	for (let i = x - brushSize; i <= x + brushSize; i++){
		for (let j = y - brushSize; j <= y + brushSize; j++){
			if (checkInBoundary(i, j)){
				if (env.grid[i][j] == false)
					env.addParticle(new type[element](i, j, env));
				else if (element == 'void' && env.grid[i][j] != false)
					env.delParticle(env.grid[i][j]);
			}
    	}
	}
}

function roundBrush(x, y, env){
	// let r = brushSize;
	for (let r = brushSize; r > 0; r--){
		for (let i = -r; i <= r; i++){
			for (let j = -r; j <= r; j++){
				if (Math.round(Math.sqrt(i*i + j*j)) === r){
					let xi = x + i;
					let yj = y + j;
					if (checkInBoundary(xi, yj)){
						if (env.grid[xi][yj] == false)
							env.addParticle(new type[element](xi, yj, env));
						// else if (element == 'void' && env.grid[xi][yj] != false)
						// 	env.delParticle(env.grid[xi][yj]);
					}
				}
			}
		}
	}
}


function drawRect(x, y, color){
	ctx.fillStyle = color;
	ctx.fillRect(x * pxSize, y * pxSize, pxSize, pxSize);
}

function checkInBoundary(x, y){
	if (y > 0  && y < env.gridHeight - 1 && x > 0 && x < env.gridWidth - 1)
		return true;
	return false;
}
  // console.log(random() * (220 - 200) + 200)
