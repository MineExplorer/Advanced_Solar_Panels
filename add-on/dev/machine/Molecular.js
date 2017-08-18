IDRegistry.genBlockID("molecularTransformer");
Block.createBlock("molecularTransformer", [
	{name: "Molecular Transformer", texture: [["mt", 2], ["mt", 1], ["mt", 0], ["mt", 3], ["mt", 0], ["mt", 0]], inCreative: true}
]);
/*
var molecularTransformerRenderer = new TileRenderModel(BlockID.molecularTransformer, 0);
molecularTransformerRenderer.addBox(.25, 0, .25, .75, 1, .75);
molecularTransformerRenderer.addBox(0, 0, 0, .25, .125, .25);
molecularTransformerRenderer.addBox(.75, 0, .25, 1, .125, .25);
molecularTransformerRenderer.addBox(.375, 0, .75, .625, .125, 1);
molecularTransformerRenderer.addBox(0, 0, .875, .25, 1, .25);
molecularTransformerRenderer.addBox(.75, .875, .25, 1, 1, .25);
molecularTransformerRenderer.addBox(.375, .875, .75, .625, 1, 1);
*/
Block.setBlockShape(BlockID.molecularTransformer, {x: 0.25, y: 0, z: 0.25}, {x: 0.75, y: 0.875, z: 0.75});

Recipes.addShaped({id: BlockID.molecularTransformer, count: 1, data: 0}, [
 "axa",
 "bcb", 
 "axa"
 ], ['a', BlockID.machineBlockAdvanced, 0, 'b', ItemID.circuitAdvanced, 0, 'c', ItemID.mtCore, 0, 'x', ItemID.storageLapotronCrystal, -1]);

//UI.addItemOverride(BlockID.molecularTransformer, 0, "mt")

var guiMolecularTransformer = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Molecular Transformer"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 360, y: 40, bitmap: "ASP_molecular_transformer_gui", scale: 2.1},
	],
	
	elements: {
		"progressScale": {type: "scale", x: 408, y: 140.8, direction: 3, bitmap: "ASP_molecular_progressbar", scale: 2.1},
		"slot1": {type: "slot", x: 398, y: 88, bitmap: "slotmt", size: 43},
		"slot2": {type: "slot", x: 398, y: 183, bitmap: "slotmt", size: 43},
		"textInput": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 75, width: 300, height: 50, text: "Input:"},
		"textOutput": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 120, width: 300, height: 20, text: "Output:"},
		"textEnergy": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 134, width: 300, height: 39, text: "Energy:"},
		"textProgress": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 159, width: 300, height: 39, text: "Progress:"},
	}
});

ICore.Recipe.registerRecipesFor("molecularTransformer", {
	"397:1": {id: 399, count: 1, data: 0, energy: 250000000},
	265: {id: ItemID.iridiumChunk, count: 1, data: 0, energy: 9000000},
	87: {id: 289, count: 2, data: 0, energy: 70000},
	12: {id: 13, count: 1, data: 0, energy: 50000},
	3: {id: 82, count: 1, data: 0, energy: 50000},
	"263:1": {id: 263, count: 1, data: 0, energy: 60000},
	348: {id: ItemID.sunnariumPart, count: 1, data: 0, energy: 1000000},
	89: {id: ItemID.sunnarium, count: 1, data: 0, energy: 9000000},
	"35:4": {id: 89, count: 1, data: 0, energy: 500000},
	"35:11": {id: 22, count: 1, data: 0, energy: 500000},
	"35:14": {id: 152, count: 1, data: 0, energy: 500000},
	"263:0": {id: 264, count: 1, data: 0, energy: 9000000},
	//"ItemID.ingotTin": {id: ItemID.ingotSilver, count: 1, data: 0, energy: 500000},
	//"ItemID.ingotSilver": {id: 266, count: 1, data: 0, energy: 500000},
}, false);

ICore.Machine.registerPrototype(BlockID.molecularTransformer, {
	defaultValues: {
		progress: 0,
	},
	
	getEnergyStorage: function(){
		return 8192;
	},
	
	getGuiScreen: function(){
		return guiMolecularTransformer;
	},
	
	tick: function(){
		var sourceSlot = this.container.getSlot("slot1");
		var result = ICore.Recipe.getRecipeResult("molecularTransformer", sourceSlot.id) || ICore.Recipe.getRecipeResult("molecularTransformer", sourceSlot.id+":"+sourceSlot.data);
		if(result){
			this.container.setText("textInput", "Input: " + Item.getName(sourceSlot.id, sourceSlot.data));
			this.container.setText("textOutput", "Output: " + Item.getName(result.id, result.data));
			this.container.setText("textEnergy", "Energy: " + result.energy);
			this.container.setText("textProgress", "Progress: " + parseInt(this.data.progress / result.energy * 100) + "%");
			var resultSlot = this.container.getSlot("slot2");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count + result.count <= 64 || resultSlot.id == 0){
				var transfer = Math.min(this.data.energy, result.energy - this.data.progress);
				this.data.progress += transfer;
				this.data.energy -= transfer;
				this.container.setScale("progressScale", this.data.progress / result.energy);
				if(this.data.progress >= result.energy){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count++;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		else{
			this.data.progress = 0;
			this.container.setScale("progressScale", 0);
			this.container.setText("textInput", "Input:    ");
			this.container.setText("textOutput", "Output:   ");
			this.container.setText("textEnergy", "Energy:   ");
			this.container.setText("textProgress", "Progress: ");
		}
	},
	
	energyTick: ICore.Machine.basicEnergyReceiveFunc
});