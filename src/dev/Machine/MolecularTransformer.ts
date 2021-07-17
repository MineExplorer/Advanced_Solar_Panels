/// <reference path="../gui/MolecularTransformerGui.ts" />

namespace MolecularTransformer {
	let blockID = IDRegistry.genBlockID("molecularTransformer");
	Block.createBlock("molecularTransformer", [
		{name: "Molecular Transformer", texture: [["molecular_transformer", 0]], inCreative: true}
	]);
	
	ItemRegistry.setRarity(blockID, EnumRarity.RARE);

	const mesh = new RenderMesh();
	mesh.setBlockTexture("molecular_transformer_model", 0);
	mesh.importFromFile(__dir__ + "assets/res/molecular_transformer.obj", "obj", null);
	const model = new BlockRenderer.Model(mesh);
	const render = new ICRender.Model();
	render.addEntry(model);
	BlockRenderer.setStaticICRender(blockID, 0, render);
	ItemModel.getFor(blockID, 0).setModUiSpritePath("terrain-atlas/molecular_transformer.png")

	Recipes.addShaped({id: blockID, count: 1, data: 0}, [
		"aba",
		"cxc",
		"aba"
	], ['x', ItemID.mtCore, 0, 'a', BlockID.machineBlockAdvanced, 0, 'b', BlockID.transformerEV, 0, 'c', ItemID.circuitAdvanced, 0]);
	
	let mt_recipes = {
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
	for (let key in mt_recipes) {
		let result = mt_recipes[key];
		let id = key;
		if (key.indexOf(":") == -1) {
			id = eval(key);
		}
		if (id && result.id) {
			ICore.Recipe.addRecipeFor("molecularTransformer", id, result);
		}
	}
}

let MTParticles: number[] = [];
for (let i = 0; i < 16; i++) {
	MTParticles.push(Particles.registerParticleType({
		texture: "mt_work_" + i,
		size: [2, 2],
		lifetime: [4, 4],
		render: 0
	}));
}

class TileEntityMolecularTransformer extends Machine.ElectricMachine {
	emitter: Particles.ParticleEmitter;

	defaultValues = {
		energy: 0,
		id: 0,
		data: 0,
		progress: 0,
		energyNeed: 0
	}

	getTier(): number {
		return 14;
	}

	getScreenByName() {
		return guiMolecularTransformer;
	}

	setupContainer(): void {
		this.container.setSlotAddTransferPolicy("slot2", () => 0)
	}

	onDestroy(): void {
		if (this.data.id && this.data.energyNeed)
			this.region.dropItem(this.x + .5, this.y, this.z + .5, this.data.id, 1, this.data.data);
	}

	onInit(){
		this.emitter = new Particles.ParticleEmitter(this.x + .5, this.y + .5, this.z + .5)
	}

	emitParticle(){
		this.emitter.emit(MTParticles[World.getThreadTime() & 15], 0, 0, 0, 0);
	}

	onTick(): void {
		StorageInterface.checkHoppers(this);

		if (!this.data.id || !this.data.energyNeed) {
			let slot1 = this.container.getSlot("slot1");
			var result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
			if (result) {
				this.data.id = slot1.id;
				this.data.data = slot1.data;
			}
		} else {
			var result = ICore.Recipe.getRecipeResult("molecularTransformer", this.data.id, this.data.data);
		}
		if (result) {
			this.container.setText("textInput", Translation.translate("Input: ") + Item.getName(this.data.id, this.data.data));
			let itemName = Item.getName(result.id, result.data);
			if (itemName[0] == '§') itemName = itemName.slice(2);
			this.container.setText("textOutput", Translation.translate("Output: ") + itemName);
			this.container.setText("textEnergy", Translation.translate("Energy: ") + result.energy);
			this.container.setText("textProgress", Translation.translate("Progress: ") + Math.floor(this.data.progress / result.energy * 100) + "%");
			this.container.setScale("progressScale", this.data.progress / result.energy);
			if (this.energyNode.energyIn > 0) {
				this.emitParticle();
				let slot2 = this.container.getSlot("slot2");
				if (this.data.progress >= result.energy &&
				  (slot2.id == 0 || slot2.id == result.id && slot2.data == result.data && slot2.count + result.count <= Item.getMaxStack(slot2.id))) {
					this.data.id = this.data.data = 0;
					slot2.setSlot(result.id, slot2.count + 1, result.data);
					this.data.progress = this.data.energyNeed = 0;
				}
			}
		}
		else {
			this.container.setScale("progressScale", 0);
			this.container.setText("textInput", Translation.translate("Input: "));
			this.container.setText("textOutput", Translation.translate("Output: "));
			this.container.setText("textEnergy", Translation.translate("Energy: "));
			this.container.setText("textProgress", Translation.translate("Progress: "));
		}
		this.container.sendChanges();
	}

	energyReceive(type: string, amount: number, voltage: number): number {
		if (this.data.id) {
			if (!this.data.energyNeed) {
				let slot1 = this.container.getSlot("slot1");
				let result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
				this.data.energyNeed = result.energy;
				this.decreaseSlot(slot1, 1);
			}
			let add = Math.min(amount, this.data.energyNeed - this.data.progress);
			this.data.progress += add;
			return add;
		}
		return 0;
	}
}

StorageInterface.createInterface(BlockID.molecularTransformer, {
	slots: {
		"slot1": {input: true},
		"slot2": {output: true}
	},
	isValidInput: function(item) {
		return ICore.Recipe.hasRecipeFor("molecularTransformer", item.id, item.data);
	}
});

ICore.Machine.registerPrototype(BlockID.molecularTransformer, new TileEntityMolecularTransformer());
