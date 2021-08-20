class Environment {
	constructor(gridWidth, gridHeight){
		this.gridWidth = gridWidth;
		this.gridHeight = gridHeight;
		this.particleSet = new Set();
		this.resetGrid();
	}
	resetGrid(){
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

	swapParticle(oldP, newP){
		let p = newP;
		this.grid[oldP.x][oldP.y] = newP;
		this.grid[p.x][p.y] = oldP;
	}

	delParticle(p){
		drawRect(p.x,p.y, bg);
		p.updateNeighbours(p.neighbourList);
		this.grid[p.x][p.y] = false;
		this.particleSet.delete(p);
	}
}