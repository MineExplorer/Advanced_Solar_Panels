/// <reference path="./TileEntitySolarPanel.ts" />

class BlockSolarPanel extends BlockBase {
	constructor(stringID: string, name: string, texture: string, properties: PanelProperties, rarity: EnumRarity) {
		super(stringID, "machine");
		this.addVariation(name, [[texture, 2], [texture, 1], [texture, 0], [texture, 0], [texture, 0], [texture, 0]], true);
		this.setRarity(rarity);
		ICore.Machine.registerPrototype(this.id, new TileEntitySolarPanel(name, properties));
	}
}

BlockRegistry.registerBlock(new BlockSolarPanel("ASP", "Advanced Solar Panel", "asp", ASPConfig.AdvancedSolar, EnumRarity.UNCOMMON));
BlockRegistry.registerBlock(new BlockSolarPanel("HSP", "Hybrid Solar Panel", "hsp", ASPConfig.HybridSolar, EnumRarity.RARE));
BlockRegistry.registerBlock(new BlockSolarPanel("USP", "Ultimate Solar Panel", "usp", ASPConfig.UltimateSolar, EnumRarity.EPIC));
BlockRegistry.registerBlock(new BlockSolarPanel("QSP", "Quantum Solar Panel", "qsp", ASPConfig.QuantumSolar, EnumRarity.EPIC));

Callback.addCallback("PreLoaded", function() {
	Recipes.addShapeless({id: BlockID.HSP, count: 8, data: 0}, [{id: BlockID.USP, data: 0}]);

	Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
		"aaa",
		"aba",
		"aaa"
	], ['a', BlockID.HSP, 0, 'b', ItemID.circuitAdvanced, 0]);

	Recipes.addShaped({id: BlockID.QSP, count: 1, data: 0}, [
		"aaa",
		"aba",
		"aaa"
	], ['a', BlockID.USP, 0, 'b', ItemID.quantumCore, 0]);

	const aspCoreItem = __config__.getBool("advanced_solar_panel.simple_asp_recipe") ?
		BlockID.machineBlockAdvanced : ItemID.plateIrradiantReinforced;

	if (__config__.getBool("hard_recipes")) {
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
			"aaa",
			"bxb",
			"cdc"
		], ['x', BlockID.solarPanel, -1, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', aspCoreItem, 0]);

		Recipes.addShaped({id: BlockID.HSP, count: 1, data: 0}, [
			"afa",
			"bxb",
			"cdc"
		], ["f", 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, 'd', ItemID.enrichedSunnarium, 0]);

		Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
			" a ",
			"bxb",
			"cbc"
		], ['a', 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.enrichedSunnariumAlloy, 0]);
	}
	else {
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
			"aaa",
			"bxb",
			"cdc"
		], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', aspCoreItem, 0]);

		Recipes.addShaped({id: BlockID.HSP, count: 1, data: 0}, [
			"afa",
			"bxb",
			"cdc"
		], ["f", 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, 'd', ItemID.sunnarium, 0]);

		Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
			" a ",
			"bxb",
			"cbc"
		], ['a', 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.sunnariumAlloy, 0]);
	}
});
