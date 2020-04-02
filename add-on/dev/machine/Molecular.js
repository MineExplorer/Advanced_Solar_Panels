IDRegistry.genBlockID("molecular_transformer");
Block.createBlock("molecular_transformer", [{name: "", texture: [["empty", 0]]}]);

const mtRender = new Render();

mtRender.setPart("body", [
	{//coreBottom
		type: "box",
		uv: {x: 0, y: 0},
		coords: {x: 0, y: 5.5, z: 0},
		size: {x: 10, y: 3, z: 10}
	},
	{//coreWorkZone
		type: "box",
		uv: {x: 40, y: 0},
		coords: {x: 0, y: 0.5, z: 0},
		size: {x: 6, y: 9, z: 6}
	},
	{//coreTopElectr
		type: "box",
		uv: {x: 18, y: 29},
		coords: {x: -0.5, y: -7, z: 0.033333},
		size: {x: 3, y: 2, z: 3}
	},
	{//coreTopPlate
		type: "box",
		uv: {x: 0, y: 15},
		coords: {x: -0.5, y: -5.5, z: 0},
		size: {x: 9, y: 3, z: 9}
	},
	{//firstElTop
		type: "box",
		uv: {x: 36, y: 15},
		coords: {x: 5, y: -6.5, z: 0},
		size: {x: 4, y: 3, z: 10}
	},
	{//firstElBottom
		type: "box",
		uv: {x: 0, y: 29},
		coords: {x: 5.5, y: 5.5, z: 0},
		size: {x: 3, y: 5, z: 6}
	}
], {width: 64, height: 40});

mtRender.getPart("body").addPart("second");
mtRender.setPart("second", [
	{//secondElTop
		type: "box",
		uv: {x: 36, y: 15},
		coords: {x: 5, y: -6.5, z: 0},
		size: {x: 4, y: 3, z: 10}
	},
	{//secondElBottom
		type: "box",
		uv: {x: 0, y: 29},
		coords: {x: 5.5, y: 5.5, z: 0},
		size: {x: 3, y: 5, z: 6}
	}
], {rotation: {y: -Math.PI * 2 / 3}, width: 64, height: 40});

mtRender.getPart("body").addPart("third");
mtRender.setPart("third", [
	{//thirdElTop
		type: "box",
		uv: {x: 36, y: 15},
		coords: {x: 5, y: -6.5, z: 0},
		size: {x: 4, y: 3, z: 10}
	},
	{//thirdElBottom
		type: "box",
		uv: {x: 0, y: 29},
		coords: {x: 5.5, y: 5.5, z: 0},
		size: {x: 3, y: 5, z: 6}
	}
], {rotation: {y: Math.PI * 2 / 3}, width: 64, height: 40});

IDRegistry.genItemID("molecular_transformer");
Item.createItem("molecular_transformer", "Molecular Transformer", {name: "molecular_transformer"});
Item.registerUseFunction("molecular_transformer", function(c, item, block){
  c = c.relative;
  block = World.getBlockID(c.x, c.y, c.z)
  if(GenerationUtils.isTransparentBlock(block)){
    World.setBlock(c.x, c.y, c.z, BlockID.molecular_transformer);
    World.addTileEntity(c.x, c.y, c.z);
    Player.decreaseCarriedItem();
    Game.prevent();
  }
});

Block.registerDropFunction("molecular_transformer", function(){
  return [[ItemID.molecular_transformer, 1]];
});

Callback.addCallback("PreLoaded", function(){
	Recipes.addShaped({id: ItemID.molecular_transformer, count: 1, data: 0}, [
	 "aba",
	 "cxc", 
	 "aba"
	], ['x', ItemID.mtCore, 0, 'a', BlockID.machineBlockAdvanced, 0, 'b', BlockID.transformerEV, 0, 'c', ItemID.circuitAdvanced, 0]);
	
	var mt_recipes = {
		"397:1": {id: 399, count: 1, data: 0, energy: 25e7},
		265: {id: ItemID.iridiumChunk, count: 1, data: 0, energy: 9e6},
		87: {id: 289, count: 2, data: 0, energy: 7e4},
		12: {id: 13, count: 1, data: 0, energy: 5e4},
		3: {id: 82, count: 1, data: 0, energy: 5e4},
		"263:1": {id: 263, count: 1, data: 0, energy: 6e4},
		348: {id: ItemID.sunnariumPart, count: 1, data: 0, energy: 1e6},
		89: {id: ItemID.sunnarium, count: 1, data: 0, energy: 9e6},
		"35:4": {id: 89, count: 1, data: 0, energy: 5e5},
		"35:11": {id: 22, count: 1, data: 0, energy: 5e5},
		"35:14": {id: 152, count: 1, data: 0, energy: 5e5},
		"263:0": {id: 264, count: 1, data: 0, energy: 9e6},
		"ItemID.dustDiamond": {id: 264, count: 1, data: 0, energy: 6e4},
		"ItemID.ingotLead": {id: ItemID.ingotSilver, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotSilver": {id: 266, count: 1, data: 0, energy: 1e6},
		// mod integration
		"351:4": {id: ItemID.gemSapphire, count: 1, data: 0, energy: 5e6},
		331: {id: ItemID.gemRuby, count: 1, data: 0, energy: 5e6},
		"ItemID.dustTitanium": {id: ItemID.dustChrome, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotTitanium": {id: ItemID.ingotChrome, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotCopper": {id: ItemID.ingotNickel, count: 1, data: 0, energy: 3e5},
		266: {id: ItemID.ingotPlatinum, count: 1, data: 0, energy: 9e6},
		// nether quartz -> certus quartz 5e5
	}
	for(var key in mt_recipes){
		var result = mt_recipes[key];
		var id = key;
		if(key.split(":").length < 2){
			id = eval(key);
		}
		if(id && result.id){
			ICore.Recipe.addRecipeFor("molecularTransformer", id, result);
		}
	}
});

var guiMT = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Molecular Transformer"}},
		inventory: {standart: true},
		background: {color: android.graphics.Color.parseColor("#8cc8fa")}
	},
	
	params: {slot: "molecular_slot"},
	
	drawing: [
		{type: "bitmap", x: 345, y: 92, bitmap: "molecular_background", scale: GUI_SCALE},
	],
	
	elements: {
		"progressScale": {type: "scale", x: 390, y: 181, direction: 3, bitmap: "molecular_bar", scale: GUI_SCALE},
		"slot1": {type: "slot", x: 374, y: 108, size: 64},
		"slot2": {type: "slot", x: 374, y: 239, size: 64, isValid: function(){return false}},
		"textInput": {type: "text", x: 520, y: 130},
		"textOutput": {type: "text", x: 520, y: 170},
		"textEnergy": {type: "text", x: 520, y: 210},
		"textProgress": {type: "text", x: 520, y: 250},
	}
});

var MTParticles = [];
for(let i = 0; i < 16; i++){
	MTParticles.push(Particles.registerParticleType({
		texture: "mt_work_" + i,
		size: [2, 2],
		lifetime: [4, 4],
		render: 0
	}));
}

ICore.Machine.registerElectricMachine(BlockID.molecular_transformer, {
	
	anim: null,
	emitter: new Particles.ParticleEmitter(this.x + 0.5, this.y + 2, this.z + 0.5),

	defaultValues: {
		id: 0,
		data: 0,
		progress: 0,
		energyNeed: 0
	},
	
	getTier: function(){
		return 14;
	},

	getGuiScreen: function(){
		return guiMT;
	},
	
	getTransportSlots: function(){
		return {input: ["slot1"], output: ["slot2"]};
	},
	
	init: function(){
		this.anim = new Animation.Base(this.x + 0.5, this.y - 1, this.z + 0.5);
		this.anim.describe({
			skin: "model/molecular_transformer.png",
			render: mtRender.getID()
		});
		this.anim.load();
		delete this.liquidStorage;
	},
	
	destroy: function(){
		if(this.data.id && this.data.energyNeed) World.drop(this.x + 0.5, this.y, this.z + 0.5, this.data.id, 1, this.data.data);
		if(this.anim){
			this.anim.destroy();
			this.anim = null;
		}
	},
	
	tick: function(){
		if(!this.data.id || !this.data.energyNeed){
			var slot1 = this.container.getSlot("slot1");
			var result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
			if(result){
				this.data.id = slot1.id;
				this.data.data = slot1.data;
			}
		}else{
			var result = ICore.Recipe.getRecipeResult("molecularTransformer", this.data.id, this.data.data);
		}
		if(result){
			this.container.setText("textInput", "Input: " + Item.getName(this.data.id, this.data.data));
			var itemName = Item.getName(result.id, result.data);
			if(itemName[0] == '§') itemName = itemName.slice(2);
			this.container.setText("textOutput", "Output: " + itemName);
			this.container.setText("textEnergy", "Energy: " + result.energy);
			this.container.setText("textProgress", "Progress: " + parseInt(this.data.progress / result.energy * 100) + "%");
			this.container.setScale("progressScale", this.data.progress / result.energy);
			if(this.data.last_energy_receive > 0){
				this.emitter.emit(MTParticles[World.getThreadTime() & 15], 0, this.x + 0.5, this.y + 0.5, this.z + 0.5);
				var slot2 = this.container.getSlot("slot2");
				if(this.data.progress >= result.energy && (slot2.id == 0 || slot2.id == result.id && slot2.data == result.data && slot2.count + result.count <= Item.getMaxStack(slot2.id))){
					this.data.id = this.data.data = 0;
					slot2.id = result.id;
					slot2.data = result.data;
					slot2.count++;
					this.data.id = this.data.data = 0;
					this.data.progress = this.data.energyNeed = 0;
				}
			}
		}
		else{
			this.container.setScale("progressScale", 0);
			this.container.setText("textInput", "Input:    ");
			this.container.setText("textOutput", "Output:   ");
			this.container.setText("textEnergy", "Energy:   ");
			this.container.setText("textProgress", "Progress: ");
		}
	},
	
	energyReceive: function(type, amount, voltage) {
		if(this.data.id){
			if(!this.data.energyNeed){
				var slot1 = this.container.getSlot("slot1");
				var result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
				this.data.energyNeed = result.energy;
				slot1.count--;
				this.container.validateSlot("slot1");
			}
			var add = Math.min(amount, this.data.energyNeed - this.data.progress);
			this.data.progress += add;
			this.data.energy_receive += add;
			this.data.voltage = Math.max(this.data.voltage, voltage);
			return add;
		}
		return 0;
	}
});
