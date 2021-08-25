class Particle{
	constructor(x, y, env){
		this.x = x;
		this.y = y;
		this.oldX = x;
		this.oldY = y;
		this.env = env;
		this.flammable = false;
		// Default neighbourList for deleting particles and activating static ones
		this.neighbourList = [
			[+0, +1],
			[-1, +0],
			[+1, +0]
		]
	}
	paint(){
		if (this.changed == true){
			drawRect(this.oldX, this.oldY, this.oldColor);
			drawRect(this.x, this.y, this.color);
			if (this.oldColor != BACKGROUND_COLOR)
				this.oldColor = BACKGROUND_COLOR;
			this.changed = false;
		}
	}
	alive(length){
		if (this.lifeTime > 0){
			if (random() < length)
				this.lifeTime--;
			return true;
		}
		else if (this.lifeTime == 0){
			this.updateNeighbours(this.neighbourList);
			this.env.delParticle(this);
			return false;
		}
	}
	moveInGrid(x, y){
		this.oldX = this.x;
		this.oldY = this.y;
		this.oldColor = BACKGROUND_COLOR;
		this.env.moveParticle(this, x, y)
		this.x = x;
		this.y = y;
		this.changed = true;
	}
	swapInGrid(x, y){
		this.oldX = this.x;
		this.oldY = this.y;
		this.oldColor = this.env.grid[x][y].color;
		this.env.swapParticle(this, this.env.grid[x][y], x, y);
		this.x = x;
		this.y = y;
		this.changed = true;
	}
	checkIsEmpty(x, y){
		if(this.env.grid[x][y] == false){
			return true;
		}
		else
			return false;
	}
	checkIsHeavier(x, y){
		if(this.env.grid[x][y].weight < this.weight)
			return true;
		else
			return false;
	}
	checkIsStatic(neighbourList){
		for (let i = 0; i < this.neighbourList.length; i++){
			let x = neighbourList[i][0];
			let y = neighbourList[i][1];
			if (this.env.grid[this.x + x][this.y + y].constructor.name != this.constructor.name){
				return false;
			}
		}
		return true;
	}
	updateNeighbours(neighbourList){
		for (let i = 0; i < this.neighbourList.length; i++){
			let x = neighbourList[i][0];
			let y = neighbourList[i][1];
			if (this.env.grid[this.x + x][this.y - y].isStatic == true){
				this.env.grid[this.x + x][this.y - y].isStatic = false;
			}
		}
	}
	checkFlammable(){
		for (let i = this.x - 1; i < this.x + 2; i++){
			for (let j = this.y - 1; j < this.y + 2; j++){
				let grid = this.env.grid;
				if (grid[i][j].flammable == true){
					if (Math.random() < grid[i][j].flammability){
						let burnTime = grid[i][j].burnTime;
						this.env.replaceParticle('burning', grid[i][j]);
						grid[i][j].lifeTime = burnTime;
					}
				}
			}
		}
	}	
	checkFlammableNew(neighbourList){
		for (let i = 0; i < this.neighbourList.length; i++){
			let x = this.x +neighbourList[i][0];
			let y = this.y + neighbourList[i][1];
			let grid = this.env.grid[this.x + x][this.y + y];
			if (grid != false){
				if (grid.flammable == true){
					console.log(grid);
					let burnTime = grid.burnTime;
					this.env.replaceParticle('burning', grid)
					console.log('replace')
					grid.lifeTime = burnTime;
					break ;
				}
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
	createSparks(time, type){
		if (this.env.grid[this.x][this.y - 1] == false && random() < 0.1){
			this.env.addParticle(new TYPE[type](this.x, this.y - 1, this.env));
			this.env.grid[this.x][this.y - 1].lifeTime = time;
		}
	}
	update(){
	}
}
class	MoveParticle extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.isStatic = false;
		this.changed = false;
	}
	update(){
		if (!this.isStatic){
			this.isStatic = this.checkIsStatic(this.neighbourList);
			if (!this.isStatic)
				this.updateNeighbours(this.neighbourList);
			for (let i = 0; i < this.neighbourList.length; i++){
				let vec = new p5.Vector(this.neighbourList[i][0], this.neighbourList[i][1])
				if (this.checkIsEmpty(this.x + vec.x , this.y + vec.y))
					this.moveInGrid(this.x + vec.x, this.y + vec.y)
				else if (this.checkIsHeavier(this.x + vec.x, this.y + vec.y))
					this.swapInGrid(this.x + vec.x, this.y + vec.y);
				if (this.changed)
						break ;
			}
			super.update();
		}
	}
}
class	SandElement extends MoveParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(SAND_COLOR);
		this.weight = SAND_WEIGHT;
		this.neighbourList = SAND_NEIGHBOURS;
		this.swapValueRandom(this.neighbourList, 1, 2);
	}
	update(){
		super.update();
	}
}
class	GunpowderElement extends MoveParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(GUNPOWDER_COLOR);
		this.weight = GUNPOWDER_WEIGHT;
		this.neighbourList = GUNPOWDER_NEIGHBOURS;
		this.flammable = true;
		this.flammability = GUNPOWDER_FLAMMABILITY;
		this.burnTime = GUNPOWDER_BURNTIME;
		this.swapValueRandom(this.neighbourList, 1, 2);
	}
	update(){
		super.update();
	}
}
class	DirtElement extends MoveParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(DIRT_COLOR);
		this.weight = DIRT_WEIGHT;
		this.neighbourList = DIRT_NEIGHBOURS;
	}
	update(){
		this.swapValueRandom(this.neighbourList, 1, 2);
		super.update();
	}
}
class	FluidParticle extends MoveParticle{
	constructor(x, y, env){
		super(x, y, env);
	}
}
class	WaterElement extends FluidParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(WATER_COLOR);
		this.weight = WATER_WEIGHT;
		this.neighbourList = WATER_NEIGHBOURS;
	}
	update(){
		this.neighbourList = [
			[+0, +1],
			[-1, +0],
			[+1, +0]
		]
		this.swapValueRandom(this.neighbourList, 1, 2);
		super.update();
	}
}
class	LavaElement extends FluidParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(LAVA_COLOR);
		this.weight = LAVA_WEIGHT;
		this.neighbourList = LAVA_NEIGHBOURS;
	}
	createStone(){
		let list = [
			[+0, +1],
			[+0, -1],
			[-1, +0],
			[+1, +0],
		]
		this.shuffle(list);
		for (let i = 0; i < list.length; i++){
			let x = this.x + list[i][0];
			let y = this.y + list[i][1];
			let p = this.env.grid[x][y];
			if (p.constructor.name != this.constructor.name){
				if (p.constructor.name == 'WaterElement'){
					this.env.replaceParticle('steam', this.env.grid[x][y]);
					this.env.replaceParticle('stone', this);
					return true;
				}
				else if(p.constructor.name == 'SandElement'){
				}
			}
		}
		return false;
	}
	update(){
		this.neighbourList = [
			[+0, +1],
			[-1, +0],
			[+1, +0]
		]
		if (this.createStone() == true){
			return ;
		}
		this.swapValueRandom(this.neighbourList, 1, 2);
		this.createSparks(1, 'fire');
		this.checkFlammable();
		super.update();
	}
}
class	OilElement extends FluidParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(OIL_COLOR);
		this.weight = OIL_WEIGHT;
		this.neighbourList = OIL_NEIGHBOURS;
		this.flammable = true;
		this.flammability = OIL_FLAMMABILITY;
		this.burnTime = OIL_BURNTIME;
	}
	update(){
		this.neighbourList = [
			[+0, +1],
			[-1, +0],
			[+1, +0]
		]
		this.swapValueRandom(this.neighbourList, 1, 2);
		super.update();
	}
}
class	AcidElement extends FluidParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(ACID_COLOR);
		this.neighbourList = ACID_NEIGHBOURS;
	}

	destroy(){
		let list = [
			[+0, +1],
			[+0, -1],
			[-1, +0],
			[+1, +0],
		]
		this.shuffle(list);
		for (let i = 0; i < list.length; i++){
			let x = this.x + list[i][0];
			let y = this.y + list[i][1];
			let p = this.env.grid[x][y];
			if (p != false && p != true && p.constructor.name != this.constructor.name){
				this.env.delParticle(this.env.grid[x][y]);
				this.env.delParticle(this);
				return true;
			}
		}
		return false;
	}
	update(){
		this.neighbourList = [
			[+0, +1],
			[-1, +0],
			[+1, +0]
		]
		this.swapValueRandom(this.neighbourList, 1, 2);
		if (!this.isStatic){
			if (this.destroy() == true)
				return ;
		}
		super.update();
	}
}
class	SteamElement extends FluidParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(STEAM_COLOR);
		this.weight = STEAM_WEIGHT;
		this.neighbourList = STEAM_NEIGHBOURS;
		this.flammable = true;
		this.flammability = 1;
		this.burnTime = 0;
	}
	update(){
		this.neighbourList = [
			[+0, -1],
			[-1, +0],
			[+1, +0]
		]
		this.swapValueRandom(this.neighbourList, 1, 2);
		if (random() < 0.8)
			this.swapValueRandom(this.neighbourList, 0, 1);
		super.update();
	}
}
class	GasElement extends FluidParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(GAS_COLOR);
		this.weight = GAS_WEIGHT;
		this.neighbourList = GAS_NEIGHBOURS;
		this.flammable = true;
		this.flammability = GAS_FLAMMABILITY;
		this.burnTime = GAS_BURNTIME;
	}
	update(){
		this.neighbourList = [
			[+0, -1],
			[-1, +0],
			[+1, +0]
		]
		this.swapValueRandom(this.neighbourList, 1, 2);
		if (random() < 0.8)
			this.swapValueRandom(this.neighbourList, 0, 1);
		super.update();
	}
}
class	FireElement extends FluidParticle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(FIRE_COLOR);
		this.weight = FIRE_WEIGHT;
		this.neighbourList = FIRE_NEIGHBOURS;
		this.lifeTime = FIRE_LIFETIME;
	}
	update(){
		this.neighbourList = [
			[+0, -1],
			[-1, +0],
			[+1, +0]
		]
		this.swapValueRandom(this.neighbourList, 1, 2);
		if (random() < 0.5)
			this.swapValueRandom(this.neighbourList, 0, 1);
		this.checkFlammable();
		if (this.alive(.2) == true)
			super.update();
	}
}
class	StoneElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(STONE_COLOR)
		this.weight = STONE_WEIGHT
		drawRect(this.x, this.y, this.color);
	}
	update(){
	}
}
class	WoodElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(WOOD_COLOR)
		this.weight = WOOD_WEIGHT;
		this.burnTime = WOOD_BURNTIME;
		this.flammability = WOOD_FLAMMABILITY;
		this.flammable = true;
		drawRect(this.x, this.y, this.color);
	}
	update(){
	}
}
class	BurningElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = randomizeColorRGBtoHexNew(BURNING_COLOR)
		this.weight = BURNING_WEIGHT;
		this.lifeTime = 0;
		this.neighbourList = BURNING_NEIGHBOURS;
		drawRect(this.x, this.y, this.color);
	}
	update(){
		this.checkFlammable(this.neighbourList);
		this.alive(1);
		this.createSparks(3, 'fire');
	}
}
class	VoidElement extends Particle{
	constructor(x, y, env){
		super(x, y, env);
		this.color = BACKGROUND_COLOR;
	}
	update(){
		this.env.delParticle(this)
	}
}
