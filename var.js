
const ELEMENT_COLOR = [100, 100, 100, 10]; // Format = [R, G, B, randomizer value]
const ELEMENT_WEIGHT = 0;
const ELEMENT_NEIGHBOURS = [[+0, +1],[-1, +0],[+1, +0]]; // Neighbours the element checks

// Sand Element
const SAND_COLOR = [240, 240, 160, 30];
const SAND_WEIGHT = 1;
const SAND_NEIGHBOURS = [[+0, +1],[-1, +1],[+1, +1]];

// Dirt Element
const DIRT_COLOR = [124, 94, 66, 30];
const DIRT_WEIGHT = 1;
const DIRT_NEIGHBOURS = [[+0, +1],[-1, +1],[+1, +1]];

// Gunpowder Element
const GUNPOWDER_COLOR = [20, 20, 20, 10];
const GUNPOWDER_WEIGHT = 1;
const GUNPOWDER_NEIGHBOURS = [[+0, +1],[-1, +1],[+1, +1]];
const GUNPOWDER_FLAMMABILITY = 0.2;
const GUNPOWDER_BURNTIME = 10;

// Water Element
const WATER_COLOR = [131, 215, 238, 20];
const WATER_WEIGHT = 0;
const WATER_NEIGHBOURS = [[+0, +1],[-1, +0],[+1, +0]];

// Lava Element
const LAVA_COLOR = [242, 113, 39, 10];
const LAVA_WEIGHT = 0;
const LAVA_NEIGHBOURS = [[+0, +1],[-1, +0],[+1, +0]];

// Oil Element
const OIL_COLOR = [50, 40, 50, 10];
const OIL_WEIGHT = -1;
const OIL_NEIGHBOURS = [[+0, +1],[-1, +0],[+1, +0]];
const OIL_FLAMMABILITY = 0.1;
const OIL_BURNTIME = 10;

// Acid Element
const ACID_COLOR = [126, 199, 123, 10]
const ACID_NEIGHBOURS = [[+0, +1],[-1, +0],[+1, +0]];

// Steam Element
const STEAM_COLOR = [210, 210, 210, 20];
const STEAM_WEIGHT = -10;
const STEAM_NEIGHBOURS = [[+0, -1],[-1, +0],[+1, +0]];

// Gas Element
const GAS_COLOR = [195, 153, 204, 30]
const GAS_WEIGHT = -9;
const GAS_NEIGHBOURS = [[+0, -1],[-1, +0],[+1, +0]];
const GAS_FLAMMABILITY = 1;
const GAS_BURNTIME = 5;

// Fire Element
const FIRE_COLOR = [242, 113, 39, 20];
const FIRE_WEIGHT = -11;
const FIRE_NEIGHBOURS = [[+0, -1],[-1, +0],[+1, +0]];
const FIRE_LIFETIME = 4;

// Stone ELement
const STONE_COLOR = [120, 120, 120, 10];
const STONE_WEIGHT = 10;

// Ice ELement
const ICE_COLOR = [210, 240, 250, 10];
const ICE_WEIGHT = 10;
const ICE_NEIGHBOURS = [[+0, +1],[+0, -1],[-1, +0],[+1, +0],[+1, -1],[-1, -1],[-1, +1],[+1, +1]];

// Burning Element
const BURNING_COLOR = [240, 100, 50, 20];
const BURNING_WEIGHT = 10;
const BURNING_NEIGHBOURS = [[+0, +1],[+0, -1],[-1, +0],[+1, +0],[+1, -1],[-1, -1],[-1, +1],[+1, +1]];

// Wood Element
const WOOD_COLOR = [186, 140, 99, 10];
const WOOD_WEIGHT = 10;
const WOOD_BURNTIME = 60;
const WOOD_FLAMMABILITY = 0.01;

// Miscellaneous
const BACKGROUND_COLOR = '#9aa1ab';

var SPAWN_RATE = 0.2;

const TYPE = {
    'sand': SandElement,
    'water': WaterElement,
    'lava': LavaElement,
    'oil': OilElement,
    'steam': SteamElement,
    'fire': FireElement,
    'stone': StoneElement,
    'ice': IceElement,
    'wood': WoodElement,
    'dirt': DirtElement,
    'burning': BurningElement,
    'gas': GasElement,
    'acid': AcidElement,
    'gunpowder': GunpowderElement,
    'void': VoidElement,
  }
