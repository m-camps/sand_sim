class Particle{
	constructor(x, y, env){
		this.x = x;
		this.y = y;
		this.oldX = x;
		this.oldY = y;
		this.env = env;
		this.neighbourList = [
			[+0, -1],
			[-1, +0],
			[+1, +0]
		]
	}
	
	paint(){
		if (this.changed == true){
			drawRect(this.oldX, this.oldY, this.oldColor);
			drawRect(this.x, this.y, this.color);
			if (this.oldColor != bg)
				this.oldColor = bg;
			this.changed = false;
		}
	}

	moveInGrid(x, y){
		this.oldX = this.x;
		this.oldY = this.y;
		this.oldColor = bg;
		this.env.moveParticle(this, x, y)
		this.x = x;
		this.y = y;
		this.changed = true
	}

	swapInGrid(x, y){
		this.oldX = this.x;
		this.oldY = this.y;
		this.oldColor = this.env.grid[x][y].color;
		this.changed = true;
		this.env.swapParticle(this, this.env.grid[x][y], x, y);
		this.x = x;
		this.y = y;
	}
	
	checkIsEmpty(x, y){
		if(this.env.grid[x][y] == false)
			return true;
		else
			return false;
	}

	checkIsHeavier(x, y){
		if(this.env.grid[x][y].weight < this.weight)
			return true;
		else
			return false;
	}

	checkIsStatic(x, y){
		for (let i = x - 1; i <= x + 1; i++){
			if (this.env.grid[i][y + 1] == false)
				return false;
		}
		return true;
	}

	updateNeighbours(neighbourList){
		for (let i = 0; i < this.neighbourList.length; i ++){
			let x = neighbourList[i][0];
			let y = neighbourList[i][1];
			if (this.env.grid[this.x + x][this.y - y].isStatic == true){
				this.env.grid[this.x + x][this.y - y].isStatic = false;
			}
		}
	}

	shuffle(array){
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	swapValueRandom(array, src, dest){
		if (Math.random() < 0.5)
			[array[src], array[dest]] = [array[dest], array[src]]
	}

	update(){
	}
}
  

class MoveParticle extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.isStatic = false;
		this.changed = false;
	}
	update(){
		if (!this.isStatic && !this.changed){
			// this.isStatic = this.checkIsStatic(this.x, this.y);
			// this.updateNeighbours(this.neighbourList);
			for (let i = 0; i < this.neighbourList.length; i++){
				let xPos = this.neighbourList[i][0];
				let yPos = this.neighbourList[i][1];
				if (this.checkIsEmpty(this.x + xPos, this.y + yPos))
					this.moveInGrid(this.x + xPos, this.y + yPos)
				else if (this.checkIsHeavier(this.x + xPos, this.y + yPos))
					this.swapInGrid(this.x + xPos, this.y + yPos);
				if (this.changed)
					break;
			}
			super.update();
		}
	}
}


class SandElement extends MoveParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(240, 240, 160, 30);
		this.weight = 1;
		this.neighbourList = [
			[+0, +1],
			[-1, +1],
			[+1, +1]
		]
	}
	update(){
		this.swapValueRandom(this.neighbourList, 1, 2);
		super.update();
	}
}

class DirtElement extends MoveParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(124, 94, 66, 30);
		this.weight = 1;
		this.neighbourList = [
			[+0, +1],
			[-1, +1],
			[+1, +1]
		]
	}
	update(){
		// this.swapValueRandom(this.neighbourList, 1, 2);
		super.update();
	}
}

class WaterElement extends MoveParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(210, 240, 250, 10);
		this.weight = 0;
		this.neighbourList = [
			[+0, +1],
			[-1, +0],
			[+1, +0],
			[+1, +1],
			[-1, +1]
		]
	}
	update(){
		this.swapValueRandom(this.neighbourList, 1, 2);
		super.update();
	}
}

class SteamElement extends MoveParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(210, 210, 210, 20);
		this.weight = -1;
		this.neighbourList = [
			[+0, -1],
			[-1, +0],
			[+1, +0]
		]
	}
	update(){
		this.shuffle(this.neighbourList);
		super.update();
	}
}

class StoneElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHex(120, 120, 120, 10)
		this.weight = 10;
		drawRect(this.x, this.y, this.color);
	}
	update(){
	}
}

class StaticElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = '#282828';
		this.weight = 10;
	}
	update(){
	}
}

class VoidElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = bg;
	}
	update(){
		this.env.delParticle(this);
	}
}
