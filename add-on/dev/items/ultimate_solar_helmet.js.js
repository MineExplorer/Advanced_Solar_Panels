IDRegistry.genItemID("ultimateSolarHelmet");
Item.createArmorItem("ultimateSolarHelmet", "Ultimate Solar Helmet", {name: "ultimate_solar_helmet"}, {type: "helmet", armor: 5, durability: 8333, texture: "armor/ultimate_solar_helmet_1.png", isTech: true});
Player.addItemCreativeInv(ItemID.ultimateSolarHelmet, 1, 1);
ICore.ChargeRegistry.registerItem(ItemID.ultimateSolarHelmet, 1000000, 1, true, 120);

IDRegistry.genItemID("ultimateSolarHelmetUncharged");
Item.createArmorItem("ultimateSolarHelmetUncharged", "Ultimate Solar Helmet", {name: "ultimate_solar_helmet"}, {type: "helmet", armor: 2, durability: 8333, texture: "armor/ultimate_solar_helmet_1.png", isTech: true});
ICore.ChargeRegistry.registerItem(ItemID.ultimateSolarHelmetUncharged, 1000000, 1, true, 120);

ICore.Recipe.registerRecipesFor("ultimate-armor-charge", {
	"ItemID.ultimateSolarHelmet": {charged: ItemID.ultimateSolarHelmet, uncharged: ItemID.ultimateSolarHelmetUncharged},
	"ItemID.ultimateSolarHelmetUncharged": {charged: ItemID.ultimateSolarHelmet, uncharged: ItemID.ultimateSolarHelmetUncharged},
}, true);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
		"asa",
		"chc"
	], ['s', BlockID.ultimateSolarPanel, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], RECIPE_FUNC_TRANSPORT_ENERGY);
	
	Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
		"s",
		"h"
	], ['s', BlockID.ultimateSolarPanel, 0, 'h', ItemID.hybridSolarHelmet, -1], RECIPE_FUNC_TRANSPORT_ENERGY);
});