class Particle{
	constructor(x, y, env){
		this.x = x;
		this.y = y;
		this.oldX = x;
		this.oldY = y;
		this.env = env;
		this.alive = 1;
	}
	
	paint(){
		drawRect(this.oldX, this.oldY, bg);
		drawRect(this.x, this.y, this.color);
	}

	checkStatic(){
		if (this.alive == 1){
			for (let i = this.x - 1; i <= this.x + 1; i++){
				for (let j = this.y - 1; j <= this.y + 1; j++){
				if (env.grid[i][j] == false)
					return ;
				}
			}
		}
		this.alive = 0;
	}
	moveInGrid(x, y){
		this.oldX = this.x;
		this.oldY = this.y;
		this.env.moveParticle(this, x, y)
		this.x = x;
		this.y = y;
		this.paint();
	}

	checkIsEmpty(x, y){
		if(this.env.grid[x][y] == false)
			return true
		else
			return false
	}
	update(){
	}
}
  
class SandElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(225, 215, 130, 30)
		this.horVel = 0;
		this.verVel = 3;
	}

	update(){
		if (this.alive == 1){
			if (this.env.grid[this.x][this.y+1] == false){this.moveInGrid(this.x, this.y + 1)}
			else if (this.env.grid[this.x][this.y+1] == WaterElement){this.moveInGrid(this.x, this.y + 1)}
			else if(random() > 0.5){
				if (this.env.grid[this.x-1][this.y+1] == false){this.moveInGrid(this.x - 1, this.y + 1)}
				else if (this.env.grid[this.x+1][this.y+1] == false){this.moveInGrid(this.x + 1, this.y + 1)}
			}
			else{
				if (this.env.grid[this.x+1][this.y+1] == false){this.moveInGrid(this.x + 1, this.y + 1)}
				else if (this.env.grid[this.x-1][this.y+1] == false){this.moveInGrid(this.x - 1, this.y + 1)}
			}
		}
	}
}
  
class WaterElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(210, 240, 250, 10)
	}

	update(){
		if (this.alive == 1){
			if (this.env.grid[this.x][this.y+1] == false){this.moveInGrid(this.x, this.y + 1)}
			else if(random() > 0.5){
				if (this.env.grid[this.x-1][this.y] == false){this.moveInGrid(this.x - 1, this.y)}
				else if (this.env.grid[this.x+1][this.y] == false){this.moveInGrid(this.x + 1, this.y)}
			}
			else{
				if (this.env.grid[this.x+1][this.y] == false){this.moveInGrid(this.x + 1, this.y)}
				else if (this.env.grid[this.x-1][this.y] == false){this.moveInGrid(this.x - 1, this.y)}
			}
		}
	}
}

class SteamElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(210, 210, 210, 20)
	}

	update(){
		if (this.alive == 1){
			if (this.env.grid[this.x][this.y-1] == false){this.moveInGrid(this.x, this.y-1)}
			else if(random() > 0.5){
				if (this.env.grid[this.x-1][this.y] == false){this.moveInGrid(this.x - 1, this.y)}
				else if (this.env.grid[this.x+1][this.y] == false){this.moveInGrid(this.x + 1, this.y)}
			}
			else{
				if (this.env.grid[this.x+1][this.y] == false){this.moveInGrid(this.x + 1, this.y)}
				else if (this.env.grid[this.x-1][this.y] == false){this.moveInGrid(this.x - 1, this.y)}
			}
		}
	}
}

class RockElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(120, 120, 120, 10)
	}
	update(){
		this.paint(ctx)
	}
}

class StaticElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = '#282828';
		this.alive = 0;
	}
}

class VoidElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = bg;
		this.alive = 0;
	}
}
