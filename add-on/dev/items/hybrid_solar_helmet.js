IDRegistry.genItemID("hybridSolarHelmet");
Item.createArmorItem("hybridSolarHelmet", "Hybrid Solar Helmet", {name: "hybrid_solar_helmet"}, {type: "helmet", armor: 5, durability: 8333, texture: "armor/hybrid_solar_helmet_1.png", isTech: true});
Player.addItemCreativeInv(ItemID.hybridSolarHelmet, 1, 1);
ICore.ChargeRegistry.registerItem(ItemID.hybridSolarHelmet, 1000000, 1, true, 120);

IDRegistry.genItemID("hybridSolarHelmetUncharged");
Item.createArmorItem("hybridSolarHelmetUncharged", "Hybrid Solar Helmet", {name: "hybrid_solar_helmet"}, {type: "helmet", armor: 2, durability: 8333, texture: "armor/hybrid_solar_helmet_1.png", isTech: true});
ICore.ChargeRegistry.registerItem(ItemID.hybridSolarHelmetUncharged, 1000000, 1, true, 120);

ICore.Recipe.registerRecipesFor("hybrid-armor-charge", {
	"ItemID.hybridSolarHelmet": {charged: ItemID.hybridSolarHelmet, uncharged: ItemID.hybridSolarHelmetUncharged},
	"ItemID.hybridSolarHelmetUncharged": {charged: ItemID.hybridSolarHelmet, uncharged: ItemID.hybridSolarHelmetUncharged},
}, true);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.hybridSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.hybridSolarHelmet)}, [
		"asa",
		"chc"
	], ['s', BlockID.hybridSolarPanel, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], RECIPE_FUNC_TRANSPORT_ENERGY);
});