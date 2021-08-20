class Environment {
	constructor(gridWidth, gridHeight){
		this.gridWidth = gridWidth;
		this.gridHeight = gridHeight;
		this.particleSet = new Set();
		this.makeGrid();
	}
	makeGrid(){
		this.grid = [];
		for (let x = 0; x < this.gridWidth; x++){
			this.grid[x] = [];
			for (let y = 0; y < this.gridHeight; y++){
				this.grid[x][y] = false;
				if (y === 0 || y === this.gridHeight - 1 || x === 0 || x === this.gridWidth - 1){
					this.grid[x][y] = true;
					drawRect(x, y, '#282828');
				}
			}
		}
	}
	
	addParticle(p){
		this.grid[p.x][p.y] = p;
		this.particleSet.add(p); 
	}

	moveParticle(p, newXPos, newYPos){
		this.grid[p.x][p.y] = false;
		this.grid[newXPos][newYPos] = p;
	}

	swapParticle(oldP, newP, x, y){
		this.grid[oldP.x][oldP.y] = newP;
		this.grid[x][y] = oldP;
		newP.x = oldP.oldX;
		newP.y = oldP.oldY;
		oldP.isStatic = false;
		newP.isStatic = false;
	}

	delParticle(p){
		drawRect(p.x, p.y, bg);
		p.updateNeighbours(p.neighbourList);
		this.grid[p.x][p.y] = false;
		this.particleSet.delete(p);
	}

	calcParticle(){
		for (let p of this.particleSet)
			p.update();
	}

	paintParticle(){
		for (let p of this.particleSet)
			p.paint();
	}
}