let pos;
let gridWidth = 100;
let gridHeight = 100;
let pxSize = 800 / gridHeight;
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
  setupUI();
}

function draw() {
  click();
  env.calcParticle();
  env.paintParticle();
  checkSelection();
}

function resetGrid(){
	gridWidth = int(document.querySelector('input[name="pixelSize"]:checked').value);
	gridHeight = int(document.querySelector('input[name="pixelSize"]:checked').value);
	pxSize = 800 / gridHeight;
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
		if (brushChoice == 'round')
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
	element = document.querySelector('input[name="element"]:checked').value;
	// element = document.getElementById("element").value;
	// brushChoice = boolean(document.getElementById("brushChoice").value);
	brushChoice = document.querySelector('input[name="brushChoice"]:checked').value;
	brushSize = int(document.querySelector('input[name="brushSize"]:checked').value);
	if (int(document.querySelector('input[name="pixelSize"]:checked').value) != gridWidth)
		resetGrid();
	document.getElementById("framerate").innerHTML = floor(frameRate());
	document.getElementById("total").innerHTML = env.particleSet.size;
	// document.getElementById("posX").innerHTML = pos.x;
	// document.getElementById("posY").innerHTML = pos.y;
	if (brushChoice == 'round'){
		document.getElementById("size-1-span").style.borderRadius="100%";
		document.getElementById("size-3-span").style.borderRadius="100%";
		document.getElementById("size-5-span").style.borderRadius="100%";
		document.getElementById("size-10-span").style.borderRadius="100%";
	}
	else{
		document.getElementById("size-1-span").style.borderRadius="0%";
		document.getElementById("size-3-span").style.borderRadius="0%";
		document.getElementById("size-5-span").style.borderRadius="0%";
		document.getElementById("size-10-span").style.borderRadius="0%";
	}
  	// if (floor(frameRate()) < 45){
	// 	document.getElementById("framerate").style.backgroundColor="lightcoral";
  	// }
  	// else
	// 	document.getElementById("framerate").style.backgroundColor="lightgreen";
}

function setupUI(){
	document.documentElement.style.setProperty('--sand-color', randomizeColorRGBtoHexNew(SAND_COLOR));
	document.documentElement.style.setProperty('--stone-color', randomizeColorRGBtoHexNew(STONE_COLOR));
	document.documentElement.style.setProperty('--wood-color', randomizeColorRGBtoHexNew(WOOD_COLOR));
	document.documentElement.style.setProperty('--water-color', randomizeColorRGBtoHexNew(WATER_COLOR));
	document.documentElement.style.setProperty('--steam-color', randomizeColorRGBtoHexNew(STEAM_COLOR));
	document.documentElement.style.setProperty('--fire-color', randomizeColorRGBtoHexNew(FIRE_COLOR));
	document.documentElement.style.setProperty('--dirt-color', randomizeColorRGBtoHexNew(DIRT_COLOR));
	document.documentElement.style.setProperty('--oil-color', randomizeColorRGBtoHexNew(OIL_COLOR));
	document.documentElement.style.setProperty('--gas-color', randomizeColorRGBtoHexNew(GAS_COLOR));
	document.documentElement.style.setProperty('--acid-color', randomizeColorRGBtoHexNew(ACID_COLOR));
	document.documentElement.style.setProperty('--gunpowder-color', randomizeColorRGBtoHexNew(GUNPOWDER_COLOR));
	document.documentElement.style.setProperty('--lava-color', randomizeColorRGBtoHexNew(LAVA_COLOR));
	document.documentElement.style.setProperty('--ice-color', randomizeColorRGBtoHexNew(ICE_COLOR));
}

function rectBrush(x, y, env){
  	for (let i = x - brushSize; i <= x + brushSize; i++){
		for (let j = y - brushSize; j <= y + brushSize; j++){
			if (checkInBoundary(i, j)){
				let spawn = SPAWN_RATE
				if (getParentName(env) == "Particle")
							spawn = 1;
				if (env.grid[i][j] == false && random() < spawn)
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