IDRegistry.genItemID("ultimateSolarHelmet");
Item.createArmorItem("ultimateSolarHelmet", "Ultimate Solar Helmet", {name: "ultimate_solar_helmet"}, {type: "helmet", armor: 5, durability: 10000, texture: "armor/ultimate_solar_helmet_1.png", isTech: true});
ChargeItemRegistry.registerItem(ItemID.ultimateSolarHelmet, "Eu", 10000000, 8192, 4, "armor", true);
ICore.ItemName.setRarity(ItemID.ultimateSolarHelmet, 3);
Item.registerNameOverrideFunction(ItemID.ultimateSolarHelmet, ICore.ItemName.showRareItemStorage);

IDRegistry.genItemID("ultimateSolarHelmetUncharged");
Item.createArmorItem("ultimateSolarHelmetUncharged", "Ultimate Solar Helmet", {name: "ultimate_solar_helmet"}, {type: "helmet", armor: 2, durability: 10000, texture: "armor/ultimate_solar_helmet_1.png", isTech: true});
ChargeItemRegistry.registerItem(ItemID.ultimateSolarHelmetUncharged, "Eu", 10000000, 8192, 4, "armor");
ICore.ItemName.setRarity(ItemID.ultimateSolarHelmetUncharged, 3);
Item.registerNameOverrideFunction(ItemID.ultimateSolarHelmetUncharged, ICore.ItemName.showRareItemStorage);

Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
	"asa",
	"chc"
], ['s', BlockID.USP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], ICore.ChargeRegistry.transportEnergy);

Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
	"s",
	"h"
], ['s', BlockID.USP, 0, 'h', ItemID.hybridSolarHelmet, -1], ICore.ChargeRegistry.transportEnergy);


ICore.Recipe.addRecipeFor("quantum-armor-charge", ItemID.ultimateSolarHelmet, {charged: ItemID.ultimateSolarHelmet, uncharged: ItemID.ultimateSolarHelmetUncharged});
ICore.Recipe.addRecipeFor("quantum-armor-charge", ItemID.ultimateSolarHelmetUncharged, {charged: ItemID.ultimateSolarHelmet, uncharged: ItemID.ultimateSolarHelmetUncharged});

ICore.UI.setArmorButton(ItemID.ultimateSolarHelmet, "button_nightvision");

Callback.addCallback("tick", function(){
	if(World.getThreadTime()%20 == 0){
		var slot = Player.getArmorSlot(0);
		if(slot.id == ItemID.ultimateSolarHelmet || slot.id == ItemID.ultimateSolarHelmetUncharged){
			chargeArmor(USP.gen_day*20, USP.gen_night*20);
		}
	}
});

Armor.registerFuncs("ultimateSolarHelmet", QUANTUM_ARMOR_FUNCS);
Armor.registerFuncs("ultimateSolarHelmetUncharged", QUANTUM_ARMOR_FUNCS);
