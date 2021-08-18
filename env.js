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
          if (y === 0 || y === this.gridHeight - 1 || x === 0 || x === this.gridWidth - 1)
            // this.addParticle(new StaticElement(x, y, this));
            this.grid[x][y] = true;
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

    delParticle(p){
      this.grid[p.x][p.y] = false;
      this.particleSet.delete(p);
    }
  }