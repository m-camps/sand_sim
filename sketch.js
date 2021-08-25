let pos;
let gridWidth = 100;
let gridHeight = 100;
let pxSize = 800 / gridWidth;
let env;
let ctx;

function setup() {
  // Init p5.js canvas
  let p5canvas = createCanvas(gridWidth * pxSize, gridHeight * pxSize);

  // Use default js canvas instead of p5.js for faster performance
  let canvas = document.getElementById('defaultCanvas0');
  ctx = canvas.getContext('2d');

  // Link canvas to p5canvas
  p5canvas.parent('canvas-div');

  resetGrid();
  pos = createVector(pmouseX, pmouseY);
}

function draw() {
  click();
  env.calcParticle();
  env.paintParticle();
  checkSelection();
//   console.log(getParentName() == "particle");
}

function resetGrid(){
	pxSize = 800 / gridWidth
	resizeCanvas(gridWidth * pxSize, gridHeight * pxSize);
	background(BACKGROUND_COLOR);
	env = new Environment(gridWidth, gridHeight);
	console.log(env.grid);
	console.log(env.particleSet);

}

function getParentName(env){
	let p = new TYPE[element](1,1,env);
	let parentName = Object.getPrototypeOf(p);
	parentName = Object.getPrototypeOf(parentName);
	parentName = parentName.constructor.name;
	env.delParticle(p);
	return parentName;
}

function click(){
  if (mouseIsPressed){
    pos.set(floor(pmouseX / pxSize), floor(pmouseY / pxSize));
    if (mouseButton === LEFT && pos.x > 0 && pos.y > 0 && pos.x < gridWidth - 1){
		if (brushChoice == false)
    		roundBrush(pos.x, pos.y, env);
		else
    		rectBrush(pos.x, pos.y, env);
    }
  }
}

function  randomizeColorRGBtoHex(r,g,b,diff){
  r = floor(random() * (r - (r - diff)) + r - diff);
  g = floor(random() * (g - (g - diff)) + g - diff);
  b = floor(random() * (b - (b - diff)) + b - diff);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function  randomizeColorRGBtoHexNew(c){
	let r = c[0];
	let g = c[1];
	let b = c[2];
	let diff = c[3];
	r = floor(random() * (r - (r - diff)) + r - diff);
	g = floor(random() * (g - (g - diff)) + g - diff);
	b = floor(random() * (b - (b - diff)) + b - diff);
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

function  checkSelection(){
  element = document.getElementById("element").value;
  brushChoice = boolean(document.getElementById("brushChoice").value);
  brushSize = int(document.getElementById("brushSize").value);
  gridWidth = int(document.getElementById("gridWidth").value);
  gridHeight = int(document.getElementById("gridHeight").value);
  document.getElementById("framerate").innerHTML = floor(frameRate());
  document.getElementById("total").innerHTML = env.particleSet.size;
  document.getElementById("posX").innerHTML = pos.x;
  document.getElementById("posY").innerHTML = pos.y;
  if (floor(frameRate()) < 45){
	document.getElementById("framerate").style.backgroundColor="lightcoral";
  }
  else
	document.getElementById("framerate").style.backgroundColor="lightgreen";
}

function rectBrush(x, y, env){
  	for (let i = x - brushSize; i <= x + brushSize; i++){
		for (let j = y - brushSize; j <= y + brushSize; j++){
			if (checkInBoundary(i, j)){
				if (env.grid[i][j] == false && random() < SPAWN_RATE)
					env.addParticle(new TYPE[element](i, j, env));
				else if (element == 'void' && env.grid[i][j] != false)
					env.delParticle(env.grid[i][j]);
			}
    	}
	}
}

function roundBrush(x, y, env){
	for (let r = brushSize; r >= 0; r--){
		for (let i = -r; i <= r; i++){
			for (let j = -r; j <= r; j++){
				if (Math.round(Math.sqrt(i*i + j*j)) === r){
					let xi = x + i;
					let yj = y + j;
					if (checkInBoundary(xi, yj)){
						let spawn = SPAWN_RATE
						if (getParentName(env) == "Particle")
							spawn = 1;
						if (env.grid[xi][yj] == false && random() < spawn)
							env.addParticle(new TYPE[element](xi, yj, env));
						else if (element == 'void' && env.grid[xi][yj] != false)
							env.delParticle(env.grid[xi][yj]);
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