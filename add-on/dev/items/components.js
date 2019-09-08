IDRegistry.genItemID("ingotIridium");
Item.createItem("ingotIridium", "Iridium Ingot", {name: "ingot_iridium", meta: 0});

IDRegistry.genItemID("ingotUranium");
Item.createItem("ingotUranium", "Enriched Uranium Ingot", {name: "ingot_uranium", meta: 0});
	
Callback.addCallback("PreLoaded", function(){
	ICore.Recipe.addRecipeFor("compressor", ItemID.iridiumChunk, {id: ItemID.ingotIridium, count: 1, data: 0})
	ICore.Recipe.addRecipeFor("compressor", ItemID.uranium, {id: ItemID.ingotUranium, count: 1, data: 0})
});

IDRegistry.genItemID("ingotIrradiantUranium");
Item.createItem("ingotIrradiantUranium", "Irradiant Uranium Ingot", {name: "ingot_irradiant_uranium", meta: 0});
Recipes.addShaped({id: ItemID.ingotIrradiantUranium, count: 1, data: 0}, [
 " a ",
 "aba",
 " a "
 ], ['a', 348, 0, 'b', ItemID.ingotUranium, 0]);

IDRegistry.genItemID("irradiantGlass");
Item.createItem("irradiantGlass", "Irradiant Glass Panel", {name: "irradiant_glass", meta: 0});
Recipes.addShaped({id: ItemID.irradiantGlass, count: 6, data: 0}, [
 "aaa",
 "bcb", 
 "aaa"
 ], ['a', BlockID.reinforcedGlass, 0, 'b', ItemID.ingotIrradiantUranium, 0, 'c', 348, 0]);

IDRegistry.genItemID("sunnariumPart");
Item.createItem("sunnariumPart", "Sunnarium Part", {name: "sunnarium_part", meta: 0});

IDRegistry.genItemID("sunnarium");
Item.createItem("sunnarium", "Sunnarium", {name: "sunnarium", meta: 0});
Recipes.addShaped({id: ItemID.sunnarium, count: 1, data: 0}, [
 "aaa",
 "aaa",
 "aaa"
 ], ['a', ItemID.sunnariumPart, 0]);

IDRegistry.genItemID("sunnariumAlloy");
Item.createItem("sunnariumAlloy", "Sunnarium Alloy", {name: "sunnarium_alloy", meta: 0});
Recipes.addShaped({id: ItemID.sunnariumAlloy, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
 ], ['a', ItemID.plateReinforcedIridium, 0, 'b', ItemID.sunnarium, 0]);
 
IDRegistry.genItemID("enrichedSunnarium");
Item.createItem("enrichedSunnarium", "Enriched Sunnarium", {name: "enriched_sunnarium", meta: 0});
Recipes.addShaped({id: ItemID.enrichedSunnarium, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
 ], ['a', ItemID.ingotIrradiantUranium, 0, 'b', ItemID.sunnarium, 0]);
 
 IDRegistry.genItemID("enrichedSunnariumAlloy");
Item.createItem("enrichedSunnariumAlloy", "Enriched Sunnarium Alloy", {name: "enriched_sunnarium_alloy", meta: 0});
Recipes.addShaped({id: ItemID.enrichedSunnariumAlloy, count: 1, data: 0}, [
 " a ",
 "aba",
 " a "
 ], ['a', ItemID.enrichedSunnarium, 0, 'b', ItemID.sunnariumAlloy, 0]);

IDRegistry.genItemID("plateIridiumIron");
Item.createItem("plateIridiumIron", "Iridium Iron Plate", {name: "plate_iridium_iron", meta: 0});
Recipes.addShaped({id: ItemID.plateIridiumIron, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
 ], ['a', 265, 0, 'b', ItemID.ingotIridium, 0]);

IDRegistry.genItemID("plateReinforcedIridiumIron");
Item.createItem("plateReinforcedIridiumIron", "Reinforced Iridium Iron Plate", {name: "plate_reinforced_iridium_iron", meta: 0});
Recipes.addShaped({id: ItemID.plateReinforcedIridiumIron, count: 1, data: 0}, [
 "aba",
 "bcb",
 "aba"
 ], ['a', ItemID.plateAlloy, 0, 'b', ItemID.carbonPlate, 0, 'c', ItemID.plateIridiumIron, 0]);

IDRegistry.genItemID("plateIrradiantReinforced");
Item.createItem("plateIrradiantReinforced", "Irradiant Reinforced Plate", {name: "plate_irradiant_reinforced", meta: 0});
Recipes.addShaped({id: ItemID.plateIrradiantReinforced, count: 1, data: 0}, [
 "aba",
 "cdc",
 "axa"
 ], ['a', 331, 0, 'b', ItemID.sunnariumPart, 0, 'c', 351, 4, 'd', ItemID.plateReinforcedIridiumIron, 0, 'x', 264, 0]);

IDRegistry.genItemID("mtCore");
Item.createItem("mtCore", "MT Core", {name: "mtCore", meta: 0});
Recipes.addShaped({id: ItemID.mtCore, count: 1, data: 0}, [
 "aba",
 "a a",
 "aba"
 ], ['a', ItemID.irradiantGlass, 0, 'b', ItemID.neutronReflectorThick, 0]);

IDRegistry.genItemID("quantumCore");
Item.createItem("quantumCore", "Quantum Core", {name: "quantum_core", meta: 0});
Recipes.addShaped({id: ItemID.quantumCore, count: 1, data: 0}, [
 "aba",
 "bcb",
 "aba"
 ], ['a', ItemID.enrichedSunnariumAlloy, 0, 'b', 399, 0, 'c', 381, 0]);