/// <reference path="./TileEntityMolecularTransformer.ts" />

namespace MolecularTransformer {
	const blockID = IDRegistry.genBlockID("molecularTransformer");
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
}

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.molecularTransformer, count: 1, data: 0}, [
		"aba",
		"cxc",
		"aba"
	], ['x', ItemID.mtCore, 0, 'a', BlockID.machineBlockAdvanced, 0, 'b', BlockID.transformerEV, 0, 'c', ItemID.circuitAdvanced, 0]);
	
	const mt_recipes = {
		"minecraft:skull:1": {id: 399, count: 1, data: 0, energy: 25e7},
		"minecraft:iron_ingot": {id: ItemID.iridiumChunk, count: 1, data: 0, energy: 9e6},
		"minecraft:netherrack": {id: 289, count: 2, data: 0, energy: 7e4},
		"minecraft:sand": {id: 13, count: 1, data: 0, energy: 5e4},
		"minecraft:dirt": {id: 82, count: 1, data: 0, energy: 5e4},
		"minecraft:charcoal": {id: 263, count: 1, data: 0, energy: 6e4},
		"minecraft:glowstone_dust": {id: ItemID.sunnariumPart, count: 1, data: 0, energy: 1e6},
		"minecraft:glowstone": {id: ItemID.sunnarium, count: 1, data: 0, energy: 9e6},
		"minecraft:wool:4": {id: 89, count: 1, data: 0, energy: 5e5},
		"minecraft:wool:11": {id: 22, count: 1, data: 0, energy: 5e5},
		"minecraft:wool:14": {id: 152, count: 1, data: 0, energy: 5e5},
		"minecraft:coal:0": {id: 264, count: 1, data: 0, energy: 9e6},
		"ItemID.dustDiamond": {id: 264, count: 1, data: 0, energy: 6e4},
		"ItemID.ingotLead": {id: ItemID.ingotSilver, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotSilver": {id: 266, count: 1, data: 0, energy: 1e6},
		// mod integration
		"minecraft:lapis_lazuli": {id: ItemID.gemSapphire, count: 1, data: 0, energy: 5e6},
		"minecraft:redstone": {id: ItemID.gemRuby, count: 1, data: 0, energy: 5e6},
		"ItemID.dustTitanium": {id: ItemID.dustChrome, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotTitanium": {id: ItemID.ingotChrome, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotCopper": {id: ItemID.ingotNickel, count: 1, data: 0, energy: 3e5},
		"minecraft:gold_ingot": {id: ItemID.ingotPlatinum, count: 1, data: 0, energy: 9e6},
		// nether quartz -> certus quartz 5e5
	}
	for (let key in mt_recipes) {
		let result = mt_recipes[key];
		if (!result.id) {
			delete mt_recipes[key];
		}
	}
	ICore.Recipe.registerRecipesFor("molecularTransformer", mt_recipes, true);
});

ICore.Machine.registerPrototype(BlockID.molecularTransformer, new TileEntityMolecularTransformer());
