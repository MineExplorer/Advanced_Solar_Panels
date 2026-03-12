/// <reference path="./TileEntityMolecularTransformer.ts" />

{
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

	const mtRecipes: MolecularTransformerRecipe[] = [
		{ source: {id: VanillaBlockID.skull, data: 1}, result: {id: VanillaItemID.nether_star, count: 1}, energy: 2.5e8 },
		{ source: {id: VanillaItemID.iron_ingot}, result: {id: ItemID.iridiumChunk, count: 1}, energy: 9e6 },
		{ source: {id: VanillaBlockID.netherrack}, result: {id: VanillaItemID.gunpowder, count: 2}, energy: 7e4 },
		{ source: {id: VanillaBlockID.sand}, result: {id: VanillaBlockID.gravel, count: 1}, energy: 5e4 },
		{ source: {id: VanillaBlockID.dirt}, result: {id: VanillaBlockID.clay, count: 1}, energy: 5e4 },
		{ source: {id: VanillaItemID.charcoal}, result: {id: VanillaItemID.coal, count: 1}, energy: 6e4 },
		{ source: {id: VanillaItemID.glowstone_dust}, result: {id: ItemID.sunnariumPart, count: 1}, energy: 1e6 },
		{ source: {id: VanillaBlockID.glowstone}, result: {id: ItemID.sunnarium, count: 1}, energy: 9e6 },
		{ source: {id: VanillaBlockID.wool, data: 4}, result: {id: VanillaBlockID.glowstone, count: 1}, energy: 5e5 },
		{ source: {id: VanillaBlockID.wool, data: 11}, result: {id: VanillaBlockID.lapis_block, count: 1}, energy: 5e5 },
		{ source: {id: VanillaBlockID.wool, data: 14}, result: {id: VanillaBlockID.redstone_block, count: 1}, energy: 5e5 },
		{ source: {id: VanillaItemID.coal, data: 0}, result: {id: VanillaItemID.diamond, count: 1}, energy: 9e6 },
		{ source: {id: ItemID.dustDiamond}, result: {id: VanillaItemID.diamond, count: 1}, energy: 6e4 },
		{ source: {id: ItemID.ingotLead}, result: {id: ItemID.ingotSilver, count: 1}, energy: 5e5 },
		{ source: {id: ItemID.ingotSilver}, result: {id: VanillaItemID.gold_ingot, count: 1}, energy: 1e6 },
		// mod integration
		{ source: {id: VanillaItemID.lapis_lazuli }, result: {id: ItemID.gemSapphire, count: 1}, energy: 5e6 },
		{ source: {id: VanillaItemID.redstone }, result: {id: ItemID.gemRuby, count: 1}, energy: 5e6 },
		{ source: {id: ItemID.dustTitanium}, result: {id: ItemID.dustChrome, count: 1}, energy: 5e5 },
		{ source: {id: ItemID.ingotTitanium}, result: {id: ItemID.ingotChrome, count: 1}, energy: 5e5 },
		{ source: {id: ItemID.ingotCopper}, result: {id: ItemID.ingotNickel, count: 1}, energy: 3e5 },
		{ source: {id: VanillaItemID.gold_ingot}, result: {id: ItemID.ingotPlatinum, count: 1}, energy: 9e6 },
		// nether quartz -> certus quartz 5e5
	].filter(r => r.source.id && r.result.id);

	ICore.Recipe.registerRecipes("molecularTransformer", mtRecipes);
});

type MolecularTransformerRecipe = {
	source: ItemInputEntry,
    result: ItemOutputEntry,
	energy: number
}

class MolecularTransformerRecipeDictionary extends MachineRecipe.SourceRecipeDictionary<MolecularTransformerRecipe>{ 
	register(recipe: MolecularTransformerRecipe): void {
		recipe.result.data ??= 0;
		super.register(recipe);
	}
}

ICore.Machine.registerPrototype(BlockID.molecularTransformer, new TileEntityMolecularTransformer());

ICore.Recipe.registerDictionary("molecularTransformer", new MolecularTransformerRecipeDictionary())

StorageInterface.createInterface(BlockID.molecularTransformer, {
	slots: {
		"slot1": {input: true},
		"slot2": {output: true}
	},
	isValidInput: function(item: ItemInstance, side: number, tileEntity: TileEntityMolecularTransformer) {
		return !!tileEntity.getRecipe(item.id, item.data);
	}
});