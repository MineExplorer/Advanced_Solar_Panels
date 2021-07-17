ItemRegistry.createItem("ingotIridium", {name: "Iridium Ingot", icon: "ingot_iridium", rarity: 2});

ItemRegistry.createItem("ingotUranium", {name: "Enriched Uranium Ingot", icon: "ingot_uranium"});

ItemRegistry.createItem("ingotIrradiantUranium", {name: "Irradiant Uranium Ingot", icon: "ingot_irradiant_uranium"});

ItemRegistry.createItem("irradiantGlass", {name: "Irradiant Glass Panel", icon: "irradiant_glass"});

ItemRegistry.createItem("sunnariumPart", {name: "Sunnarium Part",icon: "sunnarium_part"});

ItemRegistry.createItem("sunnarium", {name: "Sunnarium", icon: "sunnarium"});

ItemRegistry.createItem("sunnariumAlloy", {name: "Sunnarium Alloy", icon: "sunnarium_alloy"});

ItemRegistry.createItem("enrichedSunnarium", {name: "Enriched Sunnarium", icon: "enriched_sunnarium"});

ItemRegistry.createItem("enrichedSunnariumAlloy", {name: "Enriched Sunnarium Alloy", icon: "enriched_sunnarium_alloy"});

ItemRegistry.createItem("plateIridiumIron", {name: "Iridium Iron Plate", icon: "plate_iridium_iron"});

ItemRegistry.createItem("plateReinforcedIridiumIron", {name: "Reinforced Iridium Iron Plate", icon: "plate_reinforced_iridium_iron"});

ItemRegistry.createItem("plateIrradiantReinforced", {name: "Irradiant Reinforced Plate", icon: "plate_irradiant_reinforced"});

ItemRegistry.createItem("mtCore", {name: "MT Core", icon: "mtCore"});

ItemRegistry.createItem("quantumCore", {name: "Quantum Core", icon: "quantum_core"});

Callback.addCallback("PreLoaded", function() {
	ICore.Recipe.addRecipeFor("compressor", ItemID.iridiumChunk, {id: ItemID.ingotIridium, count: 1, data: 0})
	ICore.Recipe.addRecipeFor("compressor", ItemID.uranium, {id: ItemID.ingotUranium, count: 1, data: 0})

	Recipes.addShaped({id: ItemID.ingotIrradiantUranium, count: 1, data: 0}, [
		" a ",
		"aba",
		" a "
	], ['a', 348, 0, 'b', ItemID.ingotUranium, 0]);

	Recipes.addShaped({id: ItemID.irradiantGlass, count: 6, data: 0}, [
		"aaa",
		"bcb",
		"aaa"
	], ['a', BlockID.reinforcedGlass, 0, 'b', ItemID.ingotIrradiantUranium, 0, 'c', 348, 0]);

	Recipes.addShaped({id: ItemID.sunnarium, count: 1, data: 0}, [
		"aaa",
		"aaa",
		"aaa"
	], ['a', ItemID.sunnariumPart, 0]);

	Recipes.addShaped({id: ItemID.sunnariumAlloy, count: 1, data: 0}, [
		"aaa",
		"aba",
		"aaa"
	], ['a', ItemID.plateReinforcedIridium, 0, 'b', ItemID.sunnarium, 0]);

	Recipes.addShaped({id: ItemID.enrichedSunnarium, count: 1, data: 0}, [
		"aaa",
		"aba",
		"aaa"
	], ['a', ItemID.ingotIrradiantUranium, 0, 'b', ItemID.sunnarium, 0]);

	Recipes.addShaped({id: ItemID.enrichedSunnariumAlloy, count: 1, data: 0}, [
		" a ",
		"aba",
		" a "
	], ['a', ItemID.enrichedSunnarium, 0, 'b', ItemID.sunnariumAlloy, 0]);

	Recipes.addShaped({id: ItemID.plateIridiumIron, count: 1, data: 0}, [
		"aaa",
		"aba",
		"aaa"
	], ['a', 265, 0, 'b', ItemID.ingotIridium, 0]);

	Recipes.addShaped({id: ItemID.plateReinforcedIridiumIron, count: 1, data: 0}, [
		"aba",
		"bcb",
		"aba"
	], ['a', ItemID.plateAlloy, 0, 'b', ItemID.carbonPlate, 0, 'c', ItemID.plateIridiumIron, 0]);

	Recipes.addShaped({id: ItemID.plateIrradiantReinforced, count: 1, data: 0}, [
		"aba",
		"cdc",
		"axa"
	], ['a', 331, 0, 'b', ItemID.sunnariumPart, 0, 'c', 351, 4, 'd', ItemID.plateReinforcedIridiumIron, 0, 'x', 264, 0]);

	Recipes.addShaped({id: ItemID.mtCore, count: 1, data: 0}, [
		"aba",
		"a a",
		"aba"
	], ['a', ItemID.irradiantGlass, 0, 'b', ItemID.neutronReflectorThick, 0]);

	Recipes.addShaped({id: ItemID.quantumCore, count: 1, data: 0}, [
		"aba",
		"bcb",
		"aba"
	], ['a', ItemID.enrichedSunnariumAlloy, 0, 'b', 399, 0, 'c', 381, 0]);
});